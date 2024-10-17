// This function extracts a YouTube video Id, given a link

function getVideoId(link) {
  if (link.includes("https://www.youtube.com/watch?v=")) {
    link = link.replace("https://www.youtube.com/watch?v=", "");
  }

  if (link.includes("https://youtu.be/")) {
    link = link.replace("https://youtu.be/", "");
  }

  if (link.length > 11) {
    link = link.substring(0, 11);
  }
  return link;
}

module.exports = getVideoId;