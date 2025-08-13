<template>
  <div>
    <div class="a4" role="document">
      <div class="sheet">
        <div class="emboss-stamp" ref="visaStamp">

          <svg class="stamp-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">

            <defs>
              <filter id="grain" x="-50%" y="-50%" width="200%" height="200%">
                <feTurbulence baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="turb" />
                
                <!-- Make grayscale noise -->
                <feColorMatrix in="turb" type="matrix" values="
                  0.33 0.33 0.33 0 0
                  0.33 0.33 0.33 0 0
                  0.33 0.33 0.33 0 0
                  0    0    0    1 0" result="grayNoise" />
                
                <!-- Reduce noise opacity -->
                <feComponentTransfer in="grayNoise" result="grain">
                  <feFuncA type="linear" slope="0.1" />
                </feComponentTransfer>
                
                <!-- Isolate red channel from noise -->
                <feColorMatrix in="grain" type="matrix" values="
                  1 0 0 0 0
                  0 0 0 0 0
                  0 0 0 0 0
                  0 0 0 1 0" result="redNoise" />
                
                <!-- Composite red noise over the original -->
                <feComposite in="SourceGraphic" in2="redNoise" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
              </filter>
            </defs>
            <circle cx="200" cy="200" r="190" fill="none" stroke="#b22020" stroke-width="10" stroke-opacity="0.95" />
            <circle cx="200" cy="200" r="160" fill="none" stroke="#b22020" stroke-width="6" stroke-dasharray="5 8" stroke-linecap="round" />
            <circle cx="200" cy="200" r="120" fill="none" stroke="#b22020" stroke-width="4" stroke-opacity="0.95" />
            <g stroke="#b22020" stroke-width="2" stroke-opacity="0.65" >
              <line x1="200" y1="40" x2="200" y2="80" />
              <line x1="200" y1="320" x2="200" y2="360" />
              <line x1="40" y1="200" x2="80" y2="200" />
              <line x1="320" y1="200" x2="360" y2="200" />
            </g>
            <g opacity="0.01" filter="url(#grain)">
              <rect x="-30" y="-30" width="460" height="460" fill="#000"></rect>
            </g>
          </svg>


          <div class="stamp-content rubbed">
            <div class="stamp-title">{{ serviceType }}</div>
            <div class="stamp-sub">Ref: {{ uniqueRef }}</div>
            <div class="stamp-meta">
              <!-- <div>Ref: <span>{{ uniqueRef }}</span></div> -->
              <div>Fee: <span>{{ feeText }}</span></div>
              <div>Issuance Date: <span>{{ stampDate }}</span></div>

              <div style="margin-top: 4mm;">Issued at: <strong>{{ stampedBy }}</strong></div>
              <div class="codes">
                <canvas ref="qrCanvas" class="qr-box"></canvas>
                <svg ref="barcodeSvg" class="barcode-box"></svg>
              </div>
            </div>
            <div class="stamp-footer">{{ footerText }}</div>
          </div>
        </div>
      </div>
    </div>

    <div style="text-align:center; margin: 10px 0;" class="no-print">
      <button class="btn btn-primary" @click="printStamp">Print Stamp</button>
    </div>
  </div>
</template>

<script lang="ts">
import JsBarcode from "jsbarcode";
import QRious from "qrious";
import { onMounted, ref, computed } from "vue";
import type { DocumentData } from "@/data/document-data";
import { type PropType } from "vue";
import formatDate from "@/utils/helper";

export default {
  name: "EmbossStamp",
  props: {
    stampData: {
      type: Object as PropType<DocumentData>,
      required: true
    }
  },
  setup(props: Readonly<{ stampData: DocumentData }>) {
    const visaStamp = ref<HTMLDivElement | null>(null);
    const qrCanvas = ref(null);
    const barcodeSvg = ref(null);

    const serviceType = computed(() => props.stampData.serviceType || "SERVICE");
    const statusLine = computed(() => (props.stampData.status || "").toUpperCase());
    const uniqueRef = computed(() => props.stampData.uniqueReference ?? props.stampData.id ?? "");
    const stampDate = computed(() => formatDate(props.stampData.stamp_date));
    const feeText = computed(() =>
      typeof props.stampData.fee === "number"
        ? `₵${props.stampData.fee.toFixed(2)}`
        : props.stampData.fee
    );
    const stampedBy = computed(() => props.stampData.region || "");
    const footerText = "Ministry of Lands and Natural Resources"
    // const footerText = computed(
    //   () => (props.stampData.description || "") + " • " + (props.stampData.region || "")
    // );

    function populateCodes() {
      const qrContent = JSON.stringify({
        id: props.stampData.id,
        ref: props.stampData.uniqueReference,
        date: formatDate(props.stampData.stamp_date),
        fee: props.stampData.fee
      });

      new QRious({
        element: qrCanvas.value,
        value: qrContent,
        size: 220,
        level: "M",
        padding: 7
      });

      JsBarcode(barcodeSvg.value, String(uniqueRef.value), {
        format: "CODE128",
        displayValue: false,
        height: 40,
        width: 1,
        margin: 0
      });

      const svgEl = visaStamp.value?.querySelector(".stamp-svg");
      if (svgEl instanceof SVGElement) {
        const status = (props.stampData.status || "").toLowerCase();
        svgEl.style.filter =
          status === "complete" || status === "approved"
            ? "none"
            : "hue-rotate(190deg) saturate(0.6)";
      }
    }

  function printStamp() {
    if (!visaStamp.value) return;

    // Clone the visa stamp DOM node
    const stampClone = visaStamp.value.cloneNode(true) as HTMLElement;

    // Preserve canvas contents (e.g., QR code)
    const originalCanvases = visaStamp.value.querySelectorAll("canvas");
    const clonedCanvases = stampClone.querySelectorAll("canvas");
    originalCanvases.forEach((canvas, i) => {
      const dataURL = (canvas as HTMLCanvasElement).toDataURL("image/png");
      const img = document.createElement("img");
      img.src = dataURL;
      img.width = canvas.width - 140;
      img.height = canvas.height -140;
      clonedCanvases[i].replaceWith(img);
    });

    // Create print window
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) return;

    // Copy styles from the current document
    const styles = Array.from(document.querySelectorAll("link[rel='stylesheet'], style"))
      .map(node => node.outerHTML)
      .join("\n");

    printWindow.document.write(`
      <html>
        <head>
          <title>Stamp</title>
          ${styles}
        </head>
        <body>
          ${stampClone.outerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }


    onMounted(populateCodes);

    return {
      visaStamp,
      qrCanvas,
      barcodeSvg,
      serviceType,
      statusLine,
      uniqueRef,
      stampDate,
      feeText,
      stampedBy,
      footerText,
      printStamp
    };
  }
};
</script>

<style scoped>
/* same CSS from your HTML — keep inside scoped or move to global if needed */
.a4 {
  width: 150mm;
  height: 237mm;
  box-sizing: border-box;
  padding: 20mm;
  font-family: "Helvetica Neue", Arial, sans-serif;
  background: white;
  position: relative;
  color: #111;
  margin: 10mm auto;
}

@page {
  size: 150mm 237mm;
  margin: 0;
}

@media print {
  body * {
    visibility: hidden;
  }
  .emboss-stamp, .emboss-stamp * {
    visibility: visible;
  }
  .emboss-stamp {
    position: absolute;
    top: 0;
    left: 5%;
    transform: translateX(-50%) rotate(-6deg);
  }
}

.sheet {
  width: 100%;
  height: 100%;
  border: 0;
  display: flex;
  flex-direction: column;
  align-items: center;    
  justify-content: flex-start; 
  padding-top: 10mm;       
  position: relative;
}
.emboss-stamp {
  background: #f5f1e7;
  border-radius: 50%;
  box-shadow:
    inset 4px 4px 8px rgba(255, 255, 255, 0.8),
    inset -4px -4px 8px rgba(0, 0, 0, 0.15);
  padding: 1em;
  display: inline-block;
  filter: drop-shadow(2px 2px 1px rgba(0,0,0,0.1));
}

.emboss-stamp {
  width: 120mm;
  height: 120mm;
  position: relative;
  transform: rotate(-6deg);
  box-shadow: 0 1px 0 rgba(0,0,0,0.06);
}

.stamp-svg { width: 100%; height: 100%; display: block; }

.stamp-content {
  color: #000;
  text-shadow:
    1px 1px 0 #fff,
    -1px -1px 0 #8b0000;
  font-weight: bold;
  user-select: none;
}
.stamp-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  pointer-events: none;
}

.stamp-title {
  font-size: 4mm;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 700;
}

.stamp-sub {
  font-size: 4mm;
  letter-spacing: 0.6px;
  margin-top: 2mm;
  font-weight: 600;
}

.stamp-meta {
  margin-top: 4mm;
  font-size: 3.6mm;
  line-height: 1.2;
}

.stamp-footer {
  margin-top: -100px;
  bottom: 6mm;
  width: 100%;
  text-align: center;
  font-size: 2.6mm;
  letter-spacing: 0.4px;
}

.codes {
  display: flex;
  gap: 6mm;
  margin-top: 4mm;
  align-items: center;
}
.qr-box { margin-left: 5mm; width: 20mm; height: 22mm; background: transparent; }
.barcode-box { width: 26mm; height: 22mm; }

.rubbed {
  mix-blend-mode: multiply;
  opacity: 0.95;
}

</style>


