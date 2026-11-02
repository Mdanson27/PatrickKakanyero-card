const loader = document.getElementById('loader');
const loaderName = document.getElementById('loaderName');
const profile = document.getElementById('profile');
const fullName = 'Patrick Kakanyero';

let index = 0;
const typeName = () => {
  if (index <= fullName.length) {
    loaderName.textContent = fullName.slice(0, index);
    index += 1;
    setTimeout(typeName, 72);
  } else {
    setTimeout(() => {
      loader.classList.add('loader-exit');
      profile.classList.remove('is-hidden');
      setTimeout(() => loader.remove(), 600);
    }, 430);
  }
};

window.addEventListener('load', typeName);

const photo = document.getElementById('profilePhoto');
const fallback = document.querySelector('.portrait-fallback');
photo.addEventListener('error', () => {
  photo.style.display = 'none';
  fallback.style.display = 'flex';
});

const vCard = `BEGIN:VCARD\nVERSION:3.0\nFN:Patrick Kakanyero\nN:Kakanyero;Patrick;;;\nORG:Praxis Institute for Leadership and Professional Excellence\nTITLE:Executive Director\nTEL;TYPE=CELL:+256783035906\nTEL;TYPE=WHATSAPP:+256783035906\nEMAIL;TYPE=INTERNET:patrick.kakanyero@outlook.com\nADR;TYPE=WORK:;;Plot 71-79 Jomo Kenyatta Road;Gulu;;;Uganda\nURL:https://www.linkedin.com/in/pkakanyero\nNOTE:Executive Director and Founding Partner at Praxis Institute for Leadership and Professional Excellence.\nEND:VCARD`;

document.getElementById('saveContact').addEventListener('click', () => {
  const blob = new Blob([vCard], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Patrick-Kakanyero.vcf';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
});
