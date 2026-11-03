document.body.classList.add('loading');

const loader = document.getElementById('loader');
const loaderName = document.getElementById('loaderName');
const toast = document.getElementById('toast');
const photo = document.querySelector('.portrait');
const fullName = 'Patrick Kakanyero';
const bootStarted = performance.now();

// Remove the duplicate Leadership Profile pill from the hero.
document.querySelector('.hero-copy .status')?.remove();

const showToast = (message) => {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 1600);
};

const hideLoader = () => {
  if (!loader || loader.classList.contains('is-hidden')) return;
  loader.classList.add('is-hidden');
  document.body.classList.remove('loading');
};

const imageReady = (img) => {
  if (!img) return Promise.resolve();
  if (img.complete && img.naturalWidth) return Promise.resolve();
  return new Promise((resolve) => {
    img.addEventListener('load', resolve, { once: true });
    img.addEventListener('error', resolve, { once: true });
  });
};

let charIndex = 0;
const typeName = () => {
  if (!loaderName) return;
  if (charIndex <= fullName.length) {
    loaderName.textContent = fullName.slice(0, charIndex);
    charIndex += 1;
    window.setTimeout(typeName, 72);
  }
};
typeName();

Promise.all([imageReady(photo)]).finally(() => {
  const elapsed = performance.now() - bootStarted;
  const minimumVisible = 2100;
  const remaining = Math.max(0, minimumVisible - elapsed);
  window.setTimeout(() => requestAnimationFrame(hideLoader), remaining);
});
window.setTimeout(hideLoader, 2800);

const whatsappMessage = 'Hello Patrick Kakanyero, I am reaching out after viewing your digital profile.';
const actionUrls = {
  call: 'tel:+256783035906',
  email: 'mailto:patrick.kakanyero@outlook.com?subject=Enquiry%20via%20Patrick%20Kakanyero%20Digital%20Profile&body=Dear%20Patrick%20Kakanyero%2C%0A%0AI%20am%20reaching%20out%20after%20viewing%20your%20digital%20profile.%0A%0A',
  whatsapp: `https://api.whatsapp.com/send?phone=256783035906&text=${encodeURIComponent(whatsappMessage)}`
};

document.querySelectorAll('[data-action]').forEach((control) => {
  control.addEventListener('click', (event) => {
    const action = control.dataset.action;
    const destination = actionUrls[action];
    if (!destination) return;
    event.preventDefault();
    window.location.href = destination;
  });
});

const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:Kakanyero;Patrick;;;\nFN:Patrick Kakanyero\nORG:Praxis Institute for Leadership and Professional Excellence\nTITLE:Executive Director\nTEL;TYPE=CELL,VOICE:+256783035906\nTEL;TYPE=CELL,WHATSAPP:+256783035906\nEMAIL;TYPE=INTERNET:patrick.kakanyero@outlook.com\nADR;TYPE=WORK:;;71-79 Jomo Kenyatta Road, Elephante Commons;Gulu;;;Uganda\nURL:https://www.linkedin.com/in/pkakanyero\nNOTE:Executive Director at Praxis Institute for Leadership and Professional Excellence.\nEND:VCARD`;

const downloadContact = () => {
  try {
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'Patrick-Kakanyero.vcf';
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast('Contact card downloaded');
  } catch (error) {
    showToast('Unable to save contact on this browser');
  }
};

document.getElementById('saveContact')?.addEventListener('click', downloadContact);
document.getElementById('saveContactBottom')?.addEventListener('click', downloadContact);

document.getElementById('shareBtn')?.addEventListener('click', async () => {
  const shareData = {
    title: 'Patrick Kakanyero',
    text: 'I am Patrick Kakanyero, Executive Director at Praxis Institute for Leadership and Professional Excellence. Here is my digital profile.',
    url: window.location.href
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Profile link copied');
    } else {
      const temp = document.createElement('textarea');
      temp.value = window.location.href;
      temp.style.position = 'fixed';
      temp.style.opacity = '0';
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      temp.remove();
      showToast('Profile link copied');
    }
  } catch (error) {
    if (error?.name !== 'AbortError') showToast('Unable to share right now');
  }
});
