"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

export default function BackgroundParticles() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1
        },
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: ["#4facfe", "#00f2fe", "#7367f0", "#ec4899", "#8b5cf6"],
          },
          links: {
            color: {
              value: ["#4facfe", "#8b5cf6", "#ec4899"],
            },
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
            triangles: {
              enable: true,
              opacity: 0.05,
            },
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "out",
            },
            random: true,
            speed: 0.8,
            straight: false,
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200,
            },
          },
          number: {
            density: {
              enable: true,
              area: 900,
            },
            value: 100,
          },
          opacity: {
            value: 0.3,
            random: true,
            anim: {
              enable: true,
              speed: 0.5,
              opacity_min: 0.1,
              sync: false,
            },
          },
          shape: {
            type: ["circle", "triangle", "polygon"],
            options: {
              polygon: {
                sides: 6,
              },
            },
          },
          size: {
            value: { min: 1, max: 3 },
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.3,
              sync: false,
            },
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.05,
              opacity: 1,
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
              parallax: {
                enable: true,
                force: 60,
                smooth: 10,
              },
            },
            onClick: {
              enable: true,
              mode: "push",
            },
          },
          modes: {
            grab: {
              distance: 200,
              links: {
                opacity: 0.4,
              },
            },
            push: {
              quantity: 4,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
}