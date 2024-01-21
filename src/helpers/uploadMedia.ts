import axios from 'axios';
import { AxiosError } from 'axios';

// function to encode caption
function urlEncodeString(string: string) {
  return encodeURIComponent(string);
}

function removeHashtags(text: string) {
  return text.replace(/#[^\s#]+/g, '').trim();
}

export const uploadMedia = async (
  media_url: string,
  caption: string,
  cover_url: string,
  page: string
) => {
  console.log('uploadMedia');

  try {
    console.log('beginn');
    const access_token = process.env.ACCESS_TOKEN;

    console.log(`${page.toUpperCase()}_IG_USER_ID`)
    const ig_user_id = process.env[`${page.toUpperCase()}_IG_USER_ID`];

    console.log('ig_user_id', ig_user_id);

    const copyrightDisclaimer = `

  To request a takedown of any post, please send an email to copyright.frenchiesforthewin@gmail.com with the post url
  `;

    console.log('1');

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

    const uriEncodedCaption = urlEncodeString(
      tempCaption + copyrightDisclaimer + captionHastags
    );

    console.log('2');

    const coverUrl = cover_url || '';
    const thumbOffset = '';
    const locationId = '';
    const uploadParamsString = `caption=${uriEncodedCaption}&cover_url=${coverUrl}&thumb_offset=${thumbOffset}&location_id=${locationId}&access_token=${access_token}`;
    const uploadVideoUri = `https://graph.facebook.com/v17.0/${ig_user_id}/media?media_type=REELS&video_url=${media_url}&${uploadParamsString}`;

    const uploadResponse = await axios.post(uploadVideoUri);

    console.log('3');

    return uploadResponse.data.id;
  } catch (error) {
    // console.log(error);
    if (error instanceof AxiosError) {
      console.log(JSON.stringify(error.response?.data));

      throw new Error(error.response?.data);
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
