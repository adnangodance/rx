"use client";

import { useEffect, useRef, useState } from "react";
import { fragmentSource, vertexSource } from "@/lib/footer-light-shaders";
import { sitePath } from "@/lib/site-path";

export default function NewFooterLightBand() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elapsed = useRef(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
    if (!gl) return;
    const shaders: WebGLShader[] = [];
    const program = gl.createProgram();
    if (!program) return;
    for (const [type, source] of [[gl.VERTEX_SHADER, vertexSource], [gl.FRAGMENT_SHADER, fragmentSource]] as const) {
      const shader = gl.createShader(type);
      if (!shader) { shaders.forEach(item => gl.deleteShader(item)); gl.deleteProgram(program); return; }
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      gl.attachShader(program, shader);
    }
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      shaders.forEach(shader => gl.deleteShader(shader));
      gl.deleteProgram(program);
      return;
    }
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const time = gl.getUniformLocation(program, 'time');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let frame = 0;
    let previous = 0;

    const draw = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.round(canvas.clientWidth * ratio);
      const height = Math.round(canvas.clientHeight * ratio);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
      gl.uniform1f(time, elapsed.current);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    const tick = (now: number) => {
      if (now - previous >= 1000 / 30) {
        elapsed.current += Math.min((now - previous) / 1000, 0.05);
        previous = now;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const syncMotion = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (!paused && !reduced.matches && visible && !document.hidden) {
        previous = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncMotion();
    });
    const resize = new ResizeObserver(draw);
    const contextLost = (event: Event) => {
      event.preventDefault();
      visible = false;
      syncMotion();
      if (canvas.parentElement) delete canvas.parentElement.dataset.ready;
    };
    visibility.observe(canvas);
    resize.observe(canvas);
    reduced.addEventListener('change', syncMotion);
    document.addEventListener('visibilitychange', syncMotion);
    canvas.addEventListener('webglcontextlost', contextLost);
    draw();
    if (canvas.parentElement) canvas.parentElement.dataset.ready = "true";

    return () => {
      if (canvas.parentElement) delete canvas.parentElement.dataset.ready;
      cancelAnimationFrame(frame);
      visibility.disconnect();
      resize.disconnect();
      reduced.removeEventListener('change', syncMotion);
      document.removeEventListener('visibilitychange', syncMotion);
      canvas.removeEventListener('webglcontextlost', contextLost);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      shaders.forEach(shader => gl.deleteShader(shader));
    };
  }, [paused]);

  return <div className="new-closing-light-band">
    <canvas ref={canvasRef} aria-hidden="true" />
    <a className="new-closing-brand-tile" href="#top" aria-label="ScriptRx — back to top"><img src={sitePath("/scriptrx-logo-new-v4.png")} width="923" height="284" alt="ScriptRx" loading="lazy" /></a>
    <button type="button" className="new-closing-motion" aria-label={paused ? "Resume footer light animation" : "Pause footer light animation"} aria-pressed={paused} onClick={() => setPaused(value => !value)}>
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">{paused ? <path d="m7 4 8 6-8 6V4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /> : <path d="M6 4v12M14 4v12" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />}</svg>
    </button>
  </div>;
}
