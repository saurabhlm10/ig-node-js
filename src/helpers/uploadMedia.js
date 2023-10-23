const axios = require("axios");
const { AxiosError } = require("axios");

// function to encode caption
function urlEncodeString(string) {
  return encodeURIComponent(string);
}

function removeHashtags(text) {
  return text.replace(/#[^\s#]+/g, "").trim();
}

exports.uploadMedia = async (media_url, caption, res) => {
  console.log("uploadMedia");

  const access_token = process.env.ACCESS_TOKEN;
  const ig_user_id = process.env.IG_USER_ID;

  const copyrightDisclaimer = `

  To request a takedown of any post, please send an email to copyright.frenchiesforthewin@gmail.com with the post url
  `;

  const tempCaption = removeHashtags(caption);

  const captionHastags = `
  
  
  Rate This 1-10 🥰

  Tag your Friends!
  
  Follow @frenchiesforthewin for more
  Follow @frenchiesforthewin for more
  Follow @frenchiesforthewin for more
  
  🔊Turn on post notifications
  
  (All rights® are reserved & belong
  to their respective owners)
  
  #frenchiesforthewin #frenchievids #frenchievideo #frenchie #frenchbulldog #frenchiedaily #frenchiesofinsta #frenchiefriends #frenchiesofinstagram #frenchielove #frenchieoftheday #frenchiegram #frenchielife #frenchiepuppy #frenchiesociety #frenchiephotos #frenchiebulldog #dogslife

  `;

  const uriEncodedCaption = urlEncodeString(tempCaption + copyrightDisclaimer + captionHastags);

  const coverUrl = "";
  const thumbOffset = "";
  const locationId = "";
  const uploadParamsString = `caption=${uriEncodedCaption}&cover_url=${coverUrl}&thumb_offset=${thumbOffset}&location_id=${locationId}&access_token=${access_token}`;
  const uploadVideoUri = `https://graph.facebook.com/v17.0/${ig_user_id}/media?media_type=REELS&video_url=${media_url}&${uploadParamsString}`;

  try {
    const uploadResponse = await axios.post(uploadVideoUri);

    return uploadResponse.data.id;
  } catch (error) {
    if (error instanceof AxiosError) {
      // console.log(JSON.stringify(error.response?.data));

      throw new Error(error.response?.data);
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
