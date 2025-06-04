const regions=document.querySelectorAll('.ui-region');
const palette=document.getElementById('palette');
const colorPicker=document.getElementById('colorPicker');
const brightness=document.getElementById('brightness');
const applyBtn=document.getElementById('apply');
const importBtn=document.getElementById('importBtn');
const exportBtn=document.getElementById('exportBtn');
const imagePaletteBtn=document.getElementById('imagePaletteBtn');
const undoBtn=document.getElementById('undoBtn');
const resetBtn=document.getElementById('resetBtn');
const themeFile=document.getElementById('themeFile');
const imageFile=document.getElementById('imageFile');
let currentRegion=null;
let theme={header:'#2b2b2b',arrange:'#444',footer:'#2b2b2b'};
let history=[];
function applyTheme(){
 document.getElementById('header').style.background=theme.header;
 document.getElementById('arrange').style.background=theme.arrange;
 document.getElementById('footer').style.background=theme.footer;
}
regions.forEach(r=>{
 r.addEventListener('mouseenter',()=>r.classList.add('hover'));
 r.addEventListener('mouseleave',()=>r.classList.remove('hover'));
 r.addEventListener('click',()=>{
   currentRegion=r.id;
   colorPicker.value=rgb2hex(window.getComputedStyle(r).backgroundColor);
   palette.classList.remove('hidden');
 });
});
applyBtn.addEventListener('click',()=>{
 if(!currentRegion) return;
 history.push(JSON.stringify(theme));
 theme[currentRegion]=adjustBrightness(colorPicker.value,parseFloat(brightness.value));
 applyTheme();
});
importBtn.addEventListener('click',()=>themeFile.click());
exportBtn.addEventListener('click',()=>{
 const data=JSON.stringify(theme, null, 2);
 const blob=new Blob([data],{type:'application/json'});
 const a=document.createElement('a');
 a.href=URL.createObjectURL(blob);
 a.download='theme.json';
 a.click();
});
themeFile.addEventListener('change',e=>{
 const file=e.target.files[0];
 if(!file){
   themeFile.value = '';
   return;
 }
 const reader=new FileReader();
 reader.onload=()=>{
   try{theme=JSON.parse(reader.result);applyTheme();}
   catch(err){alert('Invalid theme file');}
   themeFile.value = '';
 };
 reader.readAsText(file);
});
imagePaletteBtn.addEventListener('click',()=>imageFile.click());
imageFile.addEventListener('change',e=>{
 const file=e.target.files[0];
 if(!file)return;
 const img=new Image();
 const reader=new FileReader();
 reader.onload=()=>{img.src=reader.result;};
 reader.readAsDataURL(file);
 img.onload=()=>{
   const canvas=document.createElement('canvas');
   canvas.width=img.width;canvas.height=img.height;
   const ctx=canvas.getContext('2d');
   ctx.drawImage(img,0,0);
   const data=ctx.getImageData(0,0,canvas.width,canvas.height).data;
   let r=0,g=0,b=0,count=0;
   for(let i=0;i<data.length;i+=4){r+=data[i];g+=data[i+1];b+=data[i+2];count++;}
   r=Math.round(r/count);g=Math.round(g/count);b=Math.round(b/count);
   colorPicker.value=rgb2hex(`rgb(${r},${g},${b})`);
 };
});
undoBtn.addEventListener('click',()=>{
 const prev=history.pop();
 if(prev){theme=JSON.parse(prev);applyTheme();}
});
resetBtn.addEventListener('click',()=>{
 theme={header:'#2b2b2b',arrange:'#444',footer:'#2b2b2b'};
 applyTheme();
});
function rgb2hex(rgb){
 const result=/rgb\((\d+),\s*(\d+),\s*(\d+)\)/.exec(rgb);
 if(!result)return '#000000';
 return'#'+[1,2,3].map(i=>('0'+parseInt(result[i]).toString(16)).slice(-2)).join('');
}
function adjustBrightness(hex,scale){
 let r=parseInt(hex.substr(1,2),16);
 let g=parseInt(hex.substr(3,2),16);
 let b=parseInt(hex.substr(5,2),16);
 r=Math.min(255,Math.max(0,Math.round(r*scale)));
 g=Math.min(255,Math.max(0,Math.round(g*scale)));
 b=Math.min(255,Math.max(0,Math.round(b*scale)));
 return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
}
applyTheme();
