/* ============================================================
   SCENE — silk-like WebGL plane for the hero image
   Tiny, capped, pauses off-screen, falls back to the image.
   ============================================================ */
(function () {
  "use strict";

  function init() {
    var hero = document.querySelector(".hero");
    var canvas = document.getElementById("fabric-canvas");
    var img = document.getElementById("hero-img");
    if (!hero || !canvas || !img) return;

    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !window.THREE) return;

    var nav = window.navigator || {};
    if (
      (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 2) ||
      (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2)
    ) {
      return;
    }

    try {
      var probe = document.createElement("canvas");
      var gl = probe.getContext("webgl") || probe.getContext("experimental-webgl");
      if (!gl) return;
    } catch (err) {
      return;
    }

    var isMobile = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    var renderer;
    var started = false;

    function start() {
      if (started || !img.naturalWidth) return;
      started = true;

      try {
        renderer = new THREE.WebGLRenderer({
          canvas: canvas,
          alpha: true,
          antialias: false,
          powerPreference: "high-performance"
        });
      } catch (err) {
        return;
      }

      renderer.setClearColor(0x000000, 0);
      renderer.outputEncoding = THREE.sRGBEncoding;

      var scene = new THREE.Scene();
      var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
      camera.position.z = 1;

      var texture = new THREE.Texture(img);
      texture.encoding = THREE.sRGBEncoding;
      texture.needsUpdate = true;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;

      var uniforms = {
        uTex: { value: texture },
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uTarget: { value: new THREE.Vector2(0, 0) },
        uPlaneAspect: { value: window.innerWidth / window.innerHeight },
        uTexAspect: { value: img.naturalWidth / img.naturalHeight || 1.6 },
        uAmount: { value: isMobile ? 0.55 : 1 }
      };

      var vertexShader = [
        "varying vec2 vUv;",
        "uniform float uTime;",
        "uniform vec2 uPointer;",
        "uniform float uAmount;",
        "void main() {",
        "  vUv = uv;",
        "  vec3 p = position;",
        "  float w = sin(p.x * 2.1 + uTime * 0.34) * 0.012;",
        "  w += sin(p.y * 2.8 - uTime * 0.27) * 0.009;",
        "  w += sin((p.x + p.y) * 1.4 + uTime * 0.2) * 0.006;",
        "  float d = distance(vec2(p.x, p.y * 0.92), uPointer * 1.04);",
        "  w += exp(-d * d * 3.6) * sin(uTime * 1.15) * 0.026;",
        "  p.z += w * uAmount;",
        "  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);",
        "}"
      ].join("\n");

      var fragmentShader = [
        "precision highp float;",
        "varying vec2 vUv;",
        "uniform sampler2D uTex;",
        "uniform float uPlaneAspect;",
        "uniform float uTexAspect;",
        "uniform float uTime;",
        "void main() {",
        "  vec2 scale = vec2(1.0);",
        "  if (uPlaneAspect > uTexAspect) {",
        "    scale.y = uTexAspect / uPlaneAspect;",
        "  } else {",
        "    scale.x = uPlaneAspect / uTexAspect;",
        "  }",
        "  vec2 uv = (vUv - 0.5) * scale + 0.5;",
        "  uv += vec2(",
        "    sin(vUv.y * 7.0 + uTime * 0.18),",
        "    cos(vUv.x * 5.0 - uTime * 0.15)",
        "  ) * 0.0011;",
        "  vec2 edge = smoothstep(0.0, 0.08, uv) * smoothstep(0.0, 0.08, 1.0 - uv);",
        "  vec3 col = texture2D(uTex, clamp(uv, 0.001, 0.999)).rgb;",
        "  col *= 0.96 + 0.06 * vUv.y;",
        "  col = mix(col, col * 0.9, 1.0 - edge.x * edge.y);",
        "  gl_FragColor = vec4(col, 1.0);",
        "}"
      ].join("\n");

      var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        depthWrite: false,
        depthTest: false
      });

      var geometry = new THREE.PlaneGeometry(
        2.08,
        2.08,
        isMobile ? 24 : 44,
        isMobile ? 16 : 28
      );
      var plane = new THREE.Mesh(geometry, material);
      scene.add(plane);

      function resize() {
        /* match the canvas CSS box (the media layer is taller than the hero
           for parallax), otherwise the WebGL frame is stretched vertically */
        var w = canvas.clientWidth || hero.clientWidth || window.innerWidth;
        var h = canvas.clientHeight || hero.clientHeight || window.innerHeight;
        var dpr = Math.min(
          window.devicePixelRatio || 1,
          isMobile ? 1.25 : 1.5
        );
        renderer.setPixelRatio(dpr);
        renderer.setSize(w, h, false);
        uniforms.uPlaneAspect.value = w / h;
        camera.updateProjectionMatrix();
      }

      resize();

      var active = true;
      var visible = true;
      var clock = new THREE.Clock();
      var raf = 0;

      var io = null;
      if ("IntersectionObserver" in window) {
        io = new IntersectionObserver(
          function (entries) {
            active = entries[0].isIntersecting;
            if (active && !raf) loop();
          },
          { threshold: 0.01 }
        );
        io.observe(hero);
      }

      document.addEventListener("visibilitychange", function () {
        visible = document.visibilityState === "visible";
        if (visible && active && !raf) loop();
      });

      function pointer(event) {
        var rect = hero.getBoundingClientRect();
        var nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        var ny = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
        uniforms.uTarget.value.set(
          Math.max(-1, Math.min(1, nx)),
          Math.max(-1, Math.min(1, ny))
        );
      }

      hero.addEventListener("pointermove", pointer, { passive: true });
      hero.addEventListener("pointerleave", function () {
        uniforms.uTarget.value.set(0, 0);
      });

      window.addEventListener("resize", resize, { passive: true });
      window.addEventListener("orientationchange", function () {
        window.setTimeout(resize, 280);
      });

      canvas.addEventListener("webglcontextlost", function (event) {
        event.preventDefault();
        hero.classList.remove("webgl-active");
        active = false;
        if (io) io.disconnect();
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
      });

      function loop() {
        if (!active || !visible) {
          raf = 0;
          return;
        }
        raf = requestAnimationFrame(loop);

        uniforms.uTime.value += clock.getDelta();
        uniforms.uPointer.value.lerp(uniforms.uTarget.value, 0.055);
        renderer.render(scene, camera);
      }

      /* first render + reveal */
      renderer.render(scene, camera);
      hero.classList.add("webgl-active");
      loop();

      if (window.SapnaMotion && typeof window.SapnaMotion.refresh === "function") {
        window.setTimeout(window.SapnaMotion.refresh, 400);
      }
    }

    if (img.complete && img.naturalWidth) {
      start();
    } else {
      img.addEventListener("load", start, { once: true });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
