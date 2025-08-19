<template>
  <div>
    <div>
      <EmbossStamp  :stampData="document" @stamp = "addToList" v-for="document in documents"
        :key="document.id" class="ms-5 mb-3"/>
    </div>
      <div style="text-align:left; margin: 30px 150px;" class="no-print">
      <button class="btn btn-primary px-5" @click="printStamp">Print</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import EmbossStamp from "@/components/Stamp/EmbossStamp.vue";
import type { DocumentData } from "@/data/document-data";
const props = defineProps<{
  stampData: DocumentData
}>()

const stampNo = computed(() => props.stampData.stamp_no )
const stampList  = ref<HTMLElement[]>([])


const numberToLetter = (num: number): string => {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  return letters[num - 1] || "";
}

const documents = computed(() => {
  const stamps: DocumentData[] = []
  for (let i = 1; i <= stampNo.value; i++ ) {
    const stamp: DocumentData = JSON.parse(JSON.stringify(props.stampData))
    stamp.uniqueReference = `${stamp.uniqueReference} (${numberToLetter(i)})`

    stamps.push(stamp)
  }

  return stamps
})

watch(documents, () => {
  stampList.value = []
}, { deep: true })




const addToList = (stampDetails: HTMLElement) => {
  stampList.value.push(stampDetails)
}

// function printStamp() {
//   //const combinedHTML = stampList.value.map(el => el.outerHTML).join('<div style="margin-top: 10px;"></div>')

//   const combinedHTML = `
//   <div class="a4">
//     ${stampList.value.map(el => el.outerHTML).join('<div style="margin-top: 10px;"></div>')}
//   </div>`

//   const printWindow = window.open("", "_blank", "width=800,height=600");
//   if (!printWindow) return;
//   const styles = Array.from(document.querySelectorAll("link[rel='stylesheet'], style"))
//     .map(n => n.outerHTML)
//     .join("\n");
//   printWindow.document.write(`
//     <html>
//       <head>
//         <title>Stamp</title>
//         ${styles}
//       </head>
//       <body>

//         ${combinedHTML}

//       </body>
//     </html>
//   `)
//   printWindow.document.close()
//   printWindow.focus()
//   printWindow.print()
// }
// function printStamp() {
//   const combinedHTML = stampList.value
//     .map(el => el.outerHTML)
//     .join('<div style="margin-top: 10px;"></div>');

//   const printWindow = window.open("", "_blank", "width=800,height=600");
//   if (!printWindow) return;

//   const styles = Array.from(document.querySelectorAll("link[rel='stylesheet'], style"))
//     .map(n => n.outerHTML)
//     .join("\n");

//   printWindow.document.write(`
//     <html>
//       <head>
//         <title>Stamp</title>
//         ${styles}
//         <style>
//           body {
//             margin: 0;
//             padding: 0;
//           }
//           .print-container {
//             display: flex;
//             justify-content: center;
//             align-items: flex-start;
//             padding: 10mm;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="a4">
//           ${combinedHTML}
//         </div>
//       </body>
//     </html>
//   `);

//   printWindow.document.close();
//   printWindow.focus();
//   printWindow.print();
// }
function printStamp() {
    // Create the stamps content wrapped in proper .a4 container
    const stampsContent = stampList.value.map(el => el.outerHTML).join('');
    
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) return;

    // Get existing styles but add print-specific fixes
    const styles = Array.from(document.querySelectorAll("link[rel='stylesheet'], style"))
        .map(n => n.outerHTML)
        .join("\n");

    // Additional print-specific CSS to fix the gray box issue and ensure proper layout
    const printSpecificCSS = `
        <style>
            /* Reset any inherited styles that might cause issues */
            * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
            }
            
            body {
                margin: 0;
                padding: 0;
                background: white !important;
            }
            
            /* Ensure .a4 container is properly set up for print */
            .a4 {
                width: 210mm !important;
                height: 297mm !important;
                box-sizing: border-box !important;
                padding: 10mm !important;
                font-family: "Helvetica Neue", Arial, sans-serif !important;
                background: white !important;
                display: grid !important;
                grid-template-columns: repeat(auto-fit, minmax(90mm, 1fr)) !important;
                grid-auto-rows: minmax(90mm, auto) !important;
                gap: 5mm !important;
                margin: 0 auto !important;
                page-break-after: always !important;
            }
            
            /* Fix the gray box issue by removing problematic shadows in print */
            @media print {
                .emboss-stamp {
                    box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.6), 
                                inset -2px -2px 4px rgba(0, 0, 0, 0.1) !important;
                    filter: none !important; /* Remove drop-shadow that causes gray box */
                    -webkit-filter: none !important;
                }
                
                /* Ensure all content is visible */
                body * {
                    visibility: hidden;
                }
                
                .a4, .a4 * {
                    visibility: visible !important;
                }
                
                .emboss-stamp, .emboss-stamp * {
                    visibility: visible !important;
                }
            }
        </style>
    `;

    printWindow.document.write(`
        <html>
        <head>
            <title>Stamp</title>
            ${styles}
            ${printSpecificCSS}
        </head>
        <body>
            <div class="a4">
                ${stampsContent}
            </div>
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    // Add a small delay to ensure styles are loaded before printing
    setTimeout(() => {
        printWindow.print();
    }, 250);
}
</script>

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
