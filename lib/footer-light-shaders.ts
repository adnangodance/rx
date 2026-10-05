export const vertexSource = `
  attribute vec2 position;
  varying vec2 uv;
  void main() {
    uv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// Original prismatic light study: a perspective fan, fine folds, and film grain.
export const fragmentSource = `
  precision highp float;
  varying vec2 uv;
  uniform float time;
  float ridge(float x, float center, float width) {
    return exp(-pow((x - center) / width, 2.0));
  }
  void main() {
    float depth = 1.0 - uv.y;
    float x = (uv.x - 0.5) / (0.66 + depth * 0.40);
    x += sin(time * 0.19 + depth * 0.8) * 0.006;
    float fold = sin(x * 34.0 + sin(x * 16.0) * 1.7);
    float silk = sin(x * 105.0 + sin(x * 41.0) * 2.0);
    float thread = pow(max(0.0, sin(x * 285.0 + silk * 1.9)), 12.0);
    vec3 dark = vec3(0.13, 0.005, 0.34);
    vec3 purple = vec3(0.52, 0.008, 0.96);
    vec3 color = mix(dark, purple, smoothstep(-0.8, 0.9, fold));
    color += vec3(0.20, 0.015, 0.32) * (silk * 0.5 + 0.5) * 0.45;
    color += vec3(0.28, 0.07, 0.42) * thread * 0.48;
    float light = ridge(x, -0.205, 0.017) + ridge(x, 0.15, 0.025);
    light += ridge(x, -0.52, 0.012) * 0.5 + ridge(x, 0.46, 0.009) * 0.6;
    color = mix(color, vec3(0.54, 0.91, 0.88), clamp(light * (0.94 - depth * 0.54), 0.0, 0.85));
    color += vec3(0.14, 0.0, 0.21) * depth;
    float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    color += (grain - 0.5) * 0.15;
    gl_FragColor = vec4(color, 1.0);
  }
`;
