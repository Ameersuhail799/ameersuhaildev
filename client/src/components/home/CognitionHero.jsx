import React, { useEffect, useRef, useState } from "react";
import Logo from "../../assets/images/Logo.png";

export function CognitionHero({ onExitIntro, isExiting }) {
  const heroRef = useRef(null);
  const mainCanvasRef = useRef(null);

  // Preloaded images reference
  const imagesRef = useRef({
    baseDesktop: null,
    revealDesktop: null,
    baseMobile: null,
    revealMobile: null,
  });

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [hasTouchedPhoto, setHasTouchedPhoto] = useState(false);
  const isMobileRef = useRef(false);

  // Animation & Liquid simulation refs
  const nodesRef = useRef(
    Array.from({ length: 16 }, () => ({ x: -1000, y: -1000 }))
  );
  const pointerRef = useRef({
    x: -1000,
    y: -1000,
    active: false,
    pointerType: "mouse",
  });

  const engagementRef = useRef(0);
  const hasSnappedRef = useRef(false);
  const clockRef = useRef(0);
  const animFrameIdRef = useRef(null);

  // DevicePixelRatio cap (1 for mobile for 60fps, 1.25 for desktop)
  const dprRef = useRef(1);

  // Preload images on mount
  useEffect(() => {
    let isMounted = true;

    const loadImg = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = reject;
      });
    };

    Promise.all([
      loadImg("/images/Base_image_desktop.png"),
      loadImg("/images/Reveal_image_desktop.png"),
      loadImg("/images/Base_image_mobile.png"),
      loadImg("/images/Reveal_image_mobile.png"),
    ])
      .then(([baseDesk, revDesk, baseMob, revMob]) => {
        if (!isMounted) return;
        imagesRef.current = {
          baseDesktop: baseDesk,
          revealDesktop: revDesk,
          baseMobile: baseMob,
          revealMobile: revMob,
        };
        setImagesLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to load hero images", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Track interaction to dismiss floating hint badge
  const triggerInteraction = () => {
    if (!hasTouchedPhoto) {
      setHasTouchedPhoto(true);
    }
  };

  // Listen to wheel scroll, keypress, and swipe gestures to exit intro
  useEffect(() => {
    if (!imagesLoaded || isExiting) return;

    let touchStartY = 0;

    const handleWheel = (e) => {
      if (e.deltaY > 15) {
        onExitIntro?.();
      }
    };

    const handleKeyDown = (e) => {
      if (["ArrowDown", "PageDown", "Space", "Enter"].includes(e.key)) {
        onExitIntro?.();
      }
    };

    const handleTouchStart = (e) => {
      triggerInteraction();
      if (e.touches && e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = (e) => {
      if (e.changedTouches && e.changedTouches.length > 0) {
        const touchEndY = e.changedTouches[0].clientY;
        if (touchStartY - touchEndY > 40) {
          onExitIntro?.();
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [imagesLoaded, isExiting, onExitIntro, hasTouchedPhoto]);

  // Main Canvas Rendering Loop with 100% Guaranteed 1:1 Image Alignment on Mobile & Desktop
  useEffect(() => {
    if (!imagesLoaded || !heroRef.current || !mainCanvasRef.current) return;

    const heroEl = heroRef.current;
    const mainCanvas = mainCanvasRef.current;
    const mainCtx = mainCanvas.getContext("2d");
    if (!mainCtx) return;

    // Create offscreen liquid field canvas
    const fieldCanvas = document.createElement("canvas");
    const fieldCtx = fieldCanvas.getContext("2d");
    if (!fieldCtx) return;

    // Create offscreen composite canvas for liquid mask
    const maskCanvas = document.createElement("canvas");
    const maskCtx = maskCanvas.getContext("2d");
    if (!maskCtx) return;

    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = mediaQuery.matches;
    const handleMotionChange = (e) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    // Resize handler
    const updateSize = () => {
      const rect = heroEl.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Mobile check: max-width 767px
      const isMobile = width <= 767;
      isMobileRef.current = isMobile;

      // Mobile optimization: cap DPR at 1 for mobile to eliminate GPU throttling, 1.25 for desktop
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.25);
      dprRef.current = dpr;

      // Canvas dimensions
      const cw = Math.round(width * dpr);
      const ch = Math.round(height * dpr);

      mainCanvas.width = cw;
      mainCanvas.height = ch;
      maskCanvas.width = cw;
      maskCanvas.height = ch;

      // Offscreen field canvas operating at 0.5x resolution for silky performance
      fieldCanvas.width = Math.max(1, Math.round(cw * 0.5));
      fieldCanvas.height = Math.max(1, Math.round(ch * 0.5));
    };

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(heroEl);

    let lastTime = performance.now();

    const animate = (currentTime) => {
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      clockRef.current += deltaTime;

      const cw = mainCanvas.width;
      const ch = mainCanvas.height;
      const dpr = dprRef.current;
      const isMobile = isMobileRef.current;

      // Select active images
      const baseImg = isMobile
        ? imagesRef.current.baseMobile
        : imagesRef.current.baseDesktop;
      const revealImg = isMobile
        ? imagesRef.current.revealMobile
        : imagesRef.current.revealDesktop;

      // Target engagement (1 if active touch/hover, 0 if inactive)
      const targetEng = pointerRef.current.active ? 1 : 0;
      if (prefersReducedMotion) {
        engagementRef.current = targetEng;
      } else {
        engagementRef.current += (targetEng - engagementRef.current) * (isMobile ? 0.2 : 0.14);
      }

      const eng = engagementRef.current;
      heroEl.style.setProperty("--p", eng.toFixed(3));

      // Node spring physics for liquid tail
      const nodes = nodesRef.current;
      const ptr = pointerRef.current;

      if (ptr.active || eng > 0.001) {
        const node0Lerp = prefersReducedMotion ? 1 : (isMobile ? 0.45 : 0.35);
        nodes[0].x += (ptr.x - nodes[0].x) * node0Lerp;
        nodes[0].y += (ptr.y - nodes[0].y) * node0Lerp;

        const nodeLerp = prefersReducedMotion ? 1 : (isMobile ? 0.48 : 0.38);
        for (let i = 1; i < nodes.length; i++) {
          nodes[i].x += (nodes[i - 1].x - nodes[i].x) * nodeLerp;
          nodes[i].y += (nodes[i - 1].y - nodes[i].y) * nodeLerp;
        }
      }

      // Touch liquid head radius (Desktop = 100, Mobile = 150)
      const headRadius = (isMobile ? 150 : 100) * dpr;

      // 1. Render offscreen field mask
      const fw = fieldCanvas.width;
      const fh = fieldCanvas.height;
      fieldCtx.clearRect(0, 0, fw, fh);

      if (eng > 0.0005) {
        fieldCtx.globalCompositeOperation = "lighter";
        const fieldScale = 0.5;
        const numNodes = nodes.length;

        for (let i = 0; i < numNodes; i++) {
          const t = i / (numNodes - 1);
          const radius = headRadius * (1 - t * 0.55);
          const r = Math.max(0, radius * eng * fieldScale);
          const alpha = Math.max(0, (0.85 - t * 0.25) * eng);

          if (r > 0.5 && alpha > 0.001) {
            const fx = nodes[i].x * fieldScale;
            const fy = nodes[i].y * fieldScale;

            const grad = fieldCtx.createRadialGradient(fx, fy, 0, fx, fy, r);
            grad.addColorStop(0, `rgba(255, 255, 255, ${alpha.toFixed(2)})`);
            grad.addColorStop(0.6, `rgba(255, 255, 255, ${(alpha * 0.6).toFixed(2)})`);
            grad.addColorStop(1, "rgba(255, 255, 255, 0)");

            fieldCtx.fillStyle = grad;
            fieldCtx.beginPath();
            fieldCtx.arc(fx, fy, r, 0, Math.PI * 2);
            fieldCtx.fill();
          }
        }
      }

      // 2. Clear main canvas
      mainCtx.clearRect(0, 0, cw, ch);

      // 3. Draw BOTH baseImg and revealImg using the EXACT SAME scale & offsets for 100.0% pixel alignment
      if (baseImg && revealImg) {
        // Calculate centered cover scale & offsets identically for both images
        const scale = Math.max(cw / baseImg.width, ch / baseImg.height);
        const drawW = baseImg.width * scale;
        const drawH = baseImg.height * scale;

        const offsetX = (cw - drawW) / 2;
        const offsetY = (ch - drawH) / 2;

        // Draw Base Image on Canvas first
        mainCtx.drawImage(baseImg, offsetX, offsetY, drawW, drawH);

        // Draw Reveal Image inside Liquid Mask if active
        if (eng > 0.0005) {
          maskCtx.clearRect(0, 0, cw, ch);
          maskCtx.globalCompositeOperation = "source-over";
          maskCtx.drawImage(fieldCanvas, 0, 0, cw, ch);
          maskCtx.globalCompositeOperation = "source-in";
          maskCtx.drawImage(revealImg, offsetX, offsetY, drawW, drawH);

          // Composite reveal liquid mask onto main canvas
          mainCtx.drawImage(maskCanvas, 0, 0, cw, ch);
        }
      }

      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      resizeObserver.disconnect();
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, [imagesLoaded]);

  // Pointer & Touch Handlers
  const handlePointerEnter = (e) => {
    triggerInteraction();
    if (e.pointerType === "mouse") {
      const rect = e.currentTarget.getBoundingClientRect();
      const dpr = dprRef.current;
      const px = (e.clientX - rect.left) * dpr;
      const py = (e.clientY - rect.top) * dpr;

      pointerRef.current = {
        x: px,
        y: py,
        active: true,
        pointerType: e.pointerType,
      };

      if (!hasSnappedRef.current) {
        nodesRef.current.forEach((node) => {
          node.x = px;
          node.y = py;
        });
        hasSnappedRef.current = true;
      }
    }
  };

  const handlePointerMove = (e) => {
    triggerInteraction();
    const rect = e.currentTarget.getBoundingClientRect();
    const dpr = dprRef.current;
    const px = (e.clientX - rect.left) * dpr;
    const py = (e.clientY - rect.top) * dpr;

    pointerRef.current.x = px;
    pointerRef.current.y = py;
    pointerRef.current.pointerType = e.pointerType;

    if (e.pointerType === "mouse" || pointerRef.current.active) {
      pointerRef.current.active = true;
    }

    if (!hasSnappedRef.current) {
      nodesRef.current.forEach((node) => {
        node.x = px;
        node.y = py;
      });
      hasSnappedRef.current = true;
    }
  };

  const handlePointerLeave = (e) => {
    if (e.pointerType === "mouse") {
      pointerRef.current.active = false;
    }
  };

  // Mobile Touch Handlers
  const handlePointerDown = (e) => {
    triggerInteraction();
    const rect = e.currentTarget.getBoundingClientRect();
    const dpr = dprRef.current;
    const px = (e.clientX - rect.left) * dpr;
    const py = (e.clientY - rect.top) * dpr;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}

    pointerRef.current = {
      x: px,
      y: py,
      active: true,
      pointerType: e.pointerType,
    };

    nodesRef.current.forEach((node) => {
      node.x = px;
      node.y = py;
    });
    hasSnappedRef.current = true;
  };

  const handlePointerUp = () => {
    pointerRef.current.active = false;
  };

  const handlePointerCancel = () => {
    pointerRef.current.active = false;
  };

  return (
    <div
      ref={heroRef}
      aria-label="Portfolio Entrance Experience"
      className={`fixed inset-0 z-[99999] w-screen h-[100dvh] min-h-[34rem] min-w-[320px] overflow-hidden bg-[#030304] select-none isolation-isolate transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExiting ? "translate-y-[-100%] opacity-0 filter blur-sm pointer-events-none" : "translate-y-0 opacity-100"
      }`}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      style={{ touchAction: "none" }}
    >
      {/* Background Technical Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.04)_0%,transparent_75%)] pointer-events-none z-0" />
      <div className="absolute inset-0 border border-white/5 m-4 md:m-8 rounded-lg pointer-events-none z-0" />

      {/* Visually hidden H1 for SEO & Accessibility */}
      <h1 className="sr-only">
        Ameer Suhail — AI/ML Engineer & Creative Developer Intro Experience
      </h1>

      {/* LAYER 1: Main Canvas (Draws Base Image & Spider-Man Liquid Reveal 1:1 Perfectly Aligned) */}
      <canvas
        ref={mainCanvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      />

      {/* FLOATING INTERACTIVE LIQUID TOUCH HINT BADGE (Option 1) */}
      <div
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none transition-all duration-500 ${
          hasTouchedPhoto ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#BF4A1A]/40 bg-[#0f0e11]/85 backdrop-blur-md shadow-[0_10px_35px_rgba(191,74,26,0.35)] animate-bounce">
          <span className="flex size-2 rounded-full bg-[#BF4A1A] animate-ping" />
          <span className="font-mono-custom text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[#F6F2FF] whitespace-nowrap">
            ✨ HOVER OR TOUCH PHOTO TO REVEAL MASK
          </span>
        </div>
      </div>

      {/* LAYER 2: Interface Chrome & Ambient Technical Metadata */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12 pointer-events-none animate-chrome-fade">
        {/* TOP CHROME BAR */}
        <header className="w-full flex items-center justify-between pointer-events-auto">
          {/* Top Left: Monogram Logo & Name */}
          <div className="flex items-center gap-3">
            <img
              src={Logo}
              alt="Ameer Suhail Monogram"
              className="w-8 h-auto object-contain shrink-0 filter drop-shadow-[0_0_8px_rgba(246,242,255,0.3)]"
            />
            <div className="flex flex-col">
              <span className="font-mono-custom text-xs uppercase tracking-[0.22em] font-semibold text-[#F6F2FF]">
                AMEER SUHAIL
              </span>
              <span className="font-mono-custom text-[9px] uppercase tracking-[0.18em] text-[#C9C5D0]/50">
                AI • SOFTWARE • DIGITAL
              </span>
            </div>
          </div>

          {/* Top Right: Status Badge */}
          <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BF4A1A] animate-ping" />
            <span className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-[#C9C5D0]">
              PORTFOLIO / 2026
            </span>
          </div>
        </header>

        {/* SIDE METADATA (Desktop only) */}
        <aside className="hidden lg:flex items-center justify-between w-full pointer-events-none my-auto">
          <div className="flex flex-col gap-1 font-mono-custom text-[10px] uppercase tracking-[0.22em] text-[#C9C5D0]/40">
            <span>SYS. 01 // BUILDING THE NEXT</span>
            <span>LEARN & EVOLVE</span>
          </div>

          <div className="flex flex-col gap-1 text-right font-mono-custom text-[10px] uppercase tracking-[0.22em] text-[#C9C5D0]/40">
            <span>AI / SOFTWARE / WEB</span>
            <span>BUILDING INTELLIGENT EXPERIENCES</span>
          </div>
        </aside>

        {/* BOTTOM CHROME BAR: ENTRY & DISCOVERY CONTROLS */}
        <footer className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto pb-4 sm:pb-0">
          {/* Discovery Message Indicator */}
          <div className="flex items-center gap-2 text-[#C9C5D0]/80">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-bounce text-[#BF4A1A]"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
            <span className="font-mono-custom text-[11px] uppercase tracking-[0.22em] font-medium text-[#F6F2FF]">
              SCROLL / SWIPE TO ENTER
            </span>
          </div>

          {/* ENTER PORTFOLIO BUTTON */}
          <button
            onClick={() => onExitIntro?.()}
            type="button"
            className="hover-this hover-brown inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 hover:bg-[#BF4A1A] border border-white/20 hover:border-[#BF4A1A] text-white text-xs uppercase tracking-[0.22em] font-mono-custom transition-all duration-300 backdrop-blur-md cursor-pointer shadow-lg hover:shadow-[#BF4A1A]/30 active:scale-95 group"
          >
            <span>ENTER PORTFOLIO</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            >
              <path
                d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </footer>
      </div>
    </div>
  );
}

export default CognitionHero;
