<template>
  <div>
      <div class="emboss-stamp" ref="visaStamp" style="position: relative;">

        <!-- Main stamp SVG with noise -->
        <!-- <svg class="stamp-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="grain" x="-50%" y="-50%" width="200%" height="200%">
              <feTurbulence baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="turb" />
              <feColorMatrix in="turb" type="matrix" values="
                0.33 0.33 0.33 0 0
                0.33 0.33 0.33 0 0
                0.33 0.33 0.33 0 0
                0    0    0    1 0" result="grayNoise" />
              <feComponentTransfer in="grayNoise" result="grain">
                <feFuncA type="linear" slope="0.1" />
              </feComponentTransfer>
              <feColorMatrix in="grain" type="matrix" values="
                1 0 0 0 0
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 1 0" result="redNoise" />
              <feComposite in="SourceGraphic" in2="redNoise" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
            </filter>
          </defs> -->

          <!-- Stamp circles -->
          <!-- <circle cx="200" cy="200" r="190" fill="none" stroke="#b22020" stroke-width="10" stroke-opacity="0.95" />
          <circle cx="200" cy="200" r="170" fill="none" stroke="#b22020" stroke-width="6" stroke-dasharray="5 8" stroke-linecap="round" />
          <circle cx="200" cy="200" r="150" fill="none" stroke="#b22020" stroke-width="4" stroke-opacity="0.95" /> -->

          <!-- Cross lines -->
          <!-- <g stroke="#b22020" stroke-width="2" stroke-opacity="0.65">
            <line x1="200" y1="6" x2="200" y2="50" />
            <line x1="200" y1="350" x2="200" y2="390" />
            <line x1="6" y1="200" x2="50" y2="200" />
            <line x1="350" y1="200" x2="390" y2="200" />
          </g> -->

          <!-- Noise layer -->
          <!-- <g opacity="0.01" filter="url(#grain)">
            <rect x="-30" y="-30" width="460" height="460" fill="#000"></rect>
          </g>
        </svg> -->
      <svg class="stamp-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>

          <path id="topCurve" d="M 30,220 a 170,170 0 0 1 340,0" fill="none" />

          <path id="bottomCurve" d="M 30,215 a 170,170 0 0 0 340,0" fill="none" />



          <filter id="grain" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="turb" />
            <feColorMatrix in="turb" type="matrix" values="
              0.33 0.33 0.33 0 0
              0.33 0.33 0.33 0 0
              0.33 0.33 0.33 0 0
              0    0    0    1 0" result="grayNoise" />
            <feComponentTransfer in="grayNoise" result="grain">
              <feFuncA type="linear" slope="0.1" />
            </feComponentTransfer>
            <feColorMatrix in="grain" type="matrix" values="
              1 0 0 0 0
              0 0 0 0 0
              0 0 0 0 0
              0 0 0 1 0" result="redNoise" />
            <feComposite in="SourceGraphic" in2="redNoise" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
          </filter>
        </defs>


        <circle cx="200" cy="200" r="190" fill="none" stroke="#b22020" stroke-width="10" stroke-opacity="0.95" />
        <circle cx="200" cy="200" r="145" fill="none" stroke="#b22020" stroke-width="6" stroke-dasharray="5 8" stroke-linecap="round" />


        <text fill="#b22020" font-size="42" font-weight="bold" letter-spacing="8">
          <textPath href="#topCurve" startOffset="50%" text-anchor="middle">GHANA</textPath>
        </text>
        <text fill="#b22020" font-size="42" font-weight="bold" letter-spacing="8">
          <textPath href="#bottomCurve" startOffset="50%" text-anchor="middle">STAMP DUTY</textPath>
        </text>

        <g stroke="#b22020" stroke-width="2" stroke-opacity="0.65">
          <line x1="6" y1="200" x2="50" y2="200" />
          <line x1="350" y1="200" x2="390" y2="200" />
        </g>

        <g opacity="0.01" filter="url(#grain)">
          <rect x="-30" y="-30" width="460" height="460" fill="#000"></rect>
        </g>
      </svg>


        <!-- Stamp content -->
        <div class="stamp-content rubbed">
          <div class="stamp-title">{{ uniqueRef }}</div>
          <div class="stamp-sub">{{ feeText }}</div>
          <div class="stamp-meta">

            <!-- QR and Barcode container -->
            <div class="codes" style="position: relative; margin-top: 5mm;">
              <!-- QR will be absolutely on top -->
              <div ref="qrSvg" class="qr-box" style="position: absolute; top: 0; left: 0; z-index: 100;"></div>
              <!-- <svg ref="barcodeSvg" class="barcode-box"></svg> -->
            </div>
            <div style="margin-top: 15mm;">
              <div>Issuance Date: <span>{{ stampDate }}</span></div>
            </div>
      
          </div>
          <!-- <div class="stamp-footer">{{ footerText }}</div> -->
        </div>
      </div>    
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import QRCode from "qrcode";
//import JsBarcode from "jsbarcode";
import type { DocumentData } from "@/data/document-data";
import formatDate from "@/utils/helper";

const props = defineProps<{
  stampData: DocumentData
}>()

const emit = defineEmits<{
  (e: "stamp", stampImg: HTMLElement) : void
}>()

const visaStamp = ref<HTMLDivElement | null>(null);
const qrSvg = ref<HTMLDivElement | null>(null);
//const barcodeSvg = ref<SVGSVGElement | null>(null);

// Replace with your props
// const props = {
//   stampData: {
//     id: 1,
//     uniqueReference: "ABC123",
//     stamp_date: new Date(),
//     fee: 100,
//     status: "approved"
//   }
// };

  const uniqueRef = computed(() => props.stampData.uniqueReference ?? "")
  const stampDate = computed(() => formatDate(props.stampData.stamp_date))
  const feeText = computed(() =>
    typeof props.stampData.fee === "number"
      ? `GHS ${props.stampData.fee.toFixed(2)}`
      : props.stampData.fee
  );
  // const stampedBy = computed(() => props.stampData.region || "");
// const footerText = "Ministry of Lands and Natural Resources"

function populateCodes() {
  const qrContent = JSON.stringify({
    id: props.stampData.id,
    ref: `${props.stampData.uniqueReference}`,
    date: stampDate.value,
    fee: props.stampData.fee
  });

  // Generate QR as SVG string
  QRCode.toString(qrContent, { type: "svg", errorCorrectionLevel: "M" }, (err: Error | null, svgString: string) => {
    if (err) return console.error(err);
    if (qrSvg.value) {
      qrSvg.value.innerHTML = svgString;
      // Scale QR for print clarity
      const svgEl = qrSvg.value.querySelector("svg");
      if (svgEl) {
        svgEl.setAttribute("width", "80");
        svgEl.setAttribute("height", "80");
      }
    }
  });

  // Barcode
  // if (barcodeSvg.value) {
  //   JsBarcode(barcodeSvg.value, uniqueRef.value, {
  //     format: "CODE128",
  //     displayValue: false,
  //     height: 40,
  //     width: 1,
  //     margin: 0
  //   });
  // }
}

onMounted(() => {
  populateCodes();
  sendStamp()
});

const sendStamp = () => {
    if (!visaStamp.value) return;
  const stampClone = visaStamp.value.cloneNode(true);
  emit("stamp", stampClone as HTMLElement)
}

</script>

<!-- <style scoped>
.qr-box svg {
  display: block;
}


.a4 {
  width: 150mm;
  height: 150mm;
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
  font-size: 5mm;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 700;
}

.stamp-sub {
  font-size: 5mm;
  letter-spacing: 0.6px;
  margin-top: 1mm;
  font-weight: 600;
}

.stamp-meta {
  margin-top: 5mm;
  font-size: 3.6mm;
  line-height: 1.2;
}

.stamp-footer {
  margin-top: 1mm;
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

.qr-box svg {
  display: block;
}
.qr-box {  margin-top: -12mm; margin-left:9mm; width: 15mm; height: 15mm; background: transparent; }
.barcode-box { width: 26mm; height: 22mm; }

.rubbed {
  mix-blend-mode: multiply;
  opacity: 0.95;
}

</style>  -->

<style scoped>
/* Auto-fit container for multiple stamps per page */
.a4 {
  width: 210mm; /* A4 width */
  height: 297mm; /* A4 height */
  box-sizing: border-box;
  padding: 10mm;
  font-family: "Helvetica Neue", Arial, sans-serif;
  background: white;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(90mm, 1fr)); /* auto columns */
  grid-auto-rows: minmax(90mm, auto); /* auto rows */
  gap: 5mm;
  margin: auto;
}

@page {
  size: A4 portrait;
  margin: 10mm;
}

@media print {
  body * { visibility: hidden; }
  .a4, .a4 * { visibility: visible; }
  .a4 { page-break-after: always; }
  .emboss-stamp, .emboss-stamp * {
        visibility: visible;
    }
  .emboss-stamp { transform: rotate(0); }
}

.sheet {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;    
  justify-content: center; 
  position: relative;
}

.emboss-stamp {
  width: 90mm;
  height: 90mm;
  background: #f5f1e7;
  border-radius: 50%;
  box-shadow:
    inset 4px 4px 8px rgba(255, 255, 255, 0.8),
    inset -4px -4px 8px rgba(0, 0, 0, 0.15);
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(2px 2px 1px rgba(0,0,0,0.1));
  position: relative;
  transform: rotate(0);
}

.stamp-svg { width: 100%; height: 100%; }

.stamp-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  pointer-events: none;
  font-weight: bold;
  color: #000;
  text-shadow: 1px 1px 0 #fff, -1px -1px 0 #8b0000;
}

.stamp-title { font-size: 4mm; letter-spacing: 1px; text-transform: uppercase; font-weight: 700; }
.stamp-sub { font-size: 4mm; letter-spacing: 0.6px; margin-top: 1mm; font-weight: 600; }
.stamp-meta { margin-top: 4mm; font-size: 3mm; line-height: 1.2; }
.stamp-footer { margin-top: 1mm; font-size: 2.5mm; letter-spacing: 0.4px; text-align: center; }

.codes { display: flex; gap: 4mm; align-items: center; margin-top: 2mm; }
.qr-box { margin-top: -10mm; margin-left:8mm; width: 15mm; height: 15mm; background: transparent; }
.barcode-box { width: 26mm; height: 22mm; }

.rubbed { mix-blend-mode: multiply; opacity: 0.95; }
</style>
