declare module 'ogl' {
  export class Renderer {
    gl: WebGLRenderingContext | WebGL2RenderingContext;
    dpr: number;
    constructor(options?: { dpr?: number; alpha?: boolean });
    setSize(width: number, height: number): void;
    render(options: { scene: Mesh }): void;
  }

  export class Program {
    constructor(gl: WebGLRenderingContext | WebGL2RenderingContext, options: {
      vertex: string;
      fragment: string;
      uniforms?: Record<string, unknown>;
    });
  }

  export class Triangle {
    constructor(gl: WebGLRenderingContext | WebGL2RenderingContext);
  }

  export class Mesh {
    constructor(gl: WebGLRenderingContext | WebGL2RenderingContext, options: {
      geometry: Triangle;
      program: Program;
    });
  }
}

