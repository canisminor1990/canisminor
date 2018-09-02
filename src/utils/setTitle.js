export default (title, desc) => {
  const meta = document.getElementsByTagName('meta');
  if (title) {
    title = `${title} - CanisMinor`;
    document.title = title;
    meta['qq-title'].setAttribute('content', title);
  } else {
    title = 'CanisMinor';
    document.title = title;
    meta['qq-title'].setAttribute('content', title);
  }
  if (desc) {
    meta['description'].setAttribute('content', desc);
    meta['qq-desc'].setAttribute('content', desc);
  } else {
    desc = 'Collection of my designs, articles and open-source programs.';
    meta['description'].setAttribute('content', desc);
    meta['qq-desc'].setAttribute('content', desc);
  }
};
