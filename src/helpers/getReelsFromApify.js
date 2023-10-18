const { ApifyClient } = require("apify-client");
const { apifyPerUsernameResultLimit } = require("../constants/apify");

// Initialize the ApifyClient with API token
const client = new ApifyClient({
  token: process.env.APIFY_KEY,
});

const getReelsFromApify = async (usernames) => {
  // Prepare Actor input
  const input = {
    username: usernames,
    resultsLimit: apifyPerUsernameResultLimit,
  };

  // return reels;

  // Run the Actor and wait for it to finish
  const run = await client.actor("xMc5Ga1oCONPmWJIa").call(input);

  // Fetch and print Actor results from the run's dataset (if any)
  console.log("Results from dataset");
  const { items } = await client.dataset(run.defaultDatasetId).listItems();
  //   items.forEach((item) => {
  //     console.dir(item);
  //   });

  return items;
};

const reels = [
  {
    id: "3158464372962798521",
    type: "Video",
    shortCode: "CvVHpzqLKu5",
    caption:
      "My Sunday plan 😴 @domwoof\n.\n.\n.\n.\n.\n.\n.\n#bullyinstafeature #bulldogfrances #ブヒ#frenchiepup #bullygram #bullybreeds #愛犬 #bully #bullyworld #instafrenchie #불독 #bulldogfrancese #フレンチブルドッグ #bouledogue #french_bulldogs #bullynation #フレブル #bullylife #bulldogsofig #loveabully #adorabull",
    hashtags: [
      "bullyinstafeature",
      "bulldogfrances",
      "ブヒ",
      "frenchiepup",
      "bullygram",
      "bullybreeds",
      "愛犬",
      "bully",
      "bullyworld",
      "instafrenchie",
      "불독",
      "bulldogfrancese",
      "フレンチブルドッグ",
      "bouledogue",
      "french_bulldogs",
      "bullynation",
      "フレブル",
      "bullylife",
      "bulldogsofig",
      "loveabully",
      "adorabull",
    ],
    mentions: ["domwoof"],
    url: "https://www.instagram.com/p/CvVHpzqLKu5/",
    commentsCount: 52,
    firstComment: "@josh.sven",
    latestComments: [
      {
        id: "17995175471189491",
        text: "@josh.sven",
        ownerUsername: "christinesinner",
        ownerProfilePicUrl:
          "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/372439137_3518079558403956_5061571209560675855_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=100&_nc_ohc=7K1XxfXGHhkAX_A2rBT&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfBAMtnaDMoSFnTTEQqWApLC-ynTuIfF-Fyrg4-o5hSmZA&oe=652FE5D4&_nc_sid=2999b8",
        timestamp: "2023-09-27T02:16:20.000Z",
        likesCount: 0,
      },
      {
        id: "17978185298374007",
        text: "🥰🥰🥰",
        ownerUsername: "beataduracova",
        ownerProfilePicUrl:
          "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/258354528_1383470542070352_6505815152976066898_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=100&_nc_ohc=e-OK9qEj5pQAX8AEwuT&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfATg9LUU_oAFsV-aMeZvtteCyJso857u7m9k7GzkJKCHw&oe=6530D706&_nc_sid=2999b8",
        timestamp: "2023-08-02T13:29:31.000Z",
        repliesCount: 1,
        replies: [
          {
            id: "17893285880851024",
            text: "цікавий  акк  @the.inststories",
            ownerUsername: "devanshdixit30",
            ownerProfilePicUrl:
              "https://instagram.fupg6-1.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fupg6-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=ed9QgRqf6gEAX-Mwzck&edm=ALXcmt0BAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AfBKXqBSy7oN4IkqR6xi8VF3XmIx0WpPXVPU6oEWtI8hxA&oe=652FE84F&_nc_sid=06c8e0",
            timestamp: "2023-08-03T04:26:21.000Z",
            likesCount: 0,
          },
        ],
        likesCount: 0,
      },
      {
        id: "18018980671713931",
        text: "😂",
        ownerUsername: "poppyandpringlefrenchies",
        ownerProfilePicUrl:
          "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/260851569_1330771587376972_8308628065049133648_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=yq-n4MXWy6sAX9mYlgI&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfBJzal9QnR8R7kPOjMsIlk1a_FTsc0V13Kf9EH5-6E0Dw&oe=6531277D&_nc_sid=2999b8",
        timestamp: "2023-08-01T18:30:52.000Z",
        repliesCount: 0,
        replies: [],
        likesCount: 0,
      },
      {
        id: "18004159420785792",
        text: "@gabrielaflores2357",
        ownerUsername: "calvin__leo_ramos",
        ownerProfilePicUrl:
          "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/320972444_552382106737739_8837322179411395746_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=111&_nc_ohc=pA5Tl0oMFrkAX95eQLd&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfA11iYQITCiCjbm0cfAKzDrydG5M0G2ejn4_waa2xXdGg&oe=65311EC3&_nc_sid=2999b8",
        timestamp: "2023-08-01T18:25:49.000Z",
        repliesCount: 0,
        replies: [],
        likesCount: 0,
      },
      {
        id: "17947638392535683",
        text: "❤️❤️❤️",
        ownerUsername: "domwoof",
        ownerProfilePicUrl:
          "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/21827279_762359513951425_5599477867432902656_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=101&_nc_ohc=w1CshAJK4KcAX_vyu7H&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfDvy9h3czv4MZEIA3nmG1ODuCCvOqwLAEUmKzuj8LNqaA&oe=65308072&_nc_sid=2999b8",
        timestamp: "2023-08-01T10:46:55.000Z",
        repliesCount: 0,
        replies: [],
        likesCount: 0,
      },
      {
        id: "17986492685266164",
        text: "🤣🤣🤣🤣🥰🥰🥰🥰🥰🥰🥰🥰🥰❤️❤️❤️❤️❤️❤️❤️",
        ownerUsername: "marigarciasosa",
        ownerProfilePicUrl:
          "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/329617291_105777459103326_4241681448857705715_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=106&_nc_ohc=07G2zKoBmvMAX8cfX0Z&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfCsMxN-IHNhJqdoSxD0jXbJbymbQwNtSUMVH7e9a9woxQ&oe=65315F0F&_nc_sid=2999b8",
        timestamp: "2023-07-31T19:22:05.000Z",
        repliesCount: 0,
        replies: [],
        likesCount: 0,
      },
      {
        id: "17964158258610672",
        text: "@michael_delloiacono",
        ownerUsername: "tiffany_delloiacono",
        ownerProfilePicUrl:
          "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/248874517_143563157998332_6481321928153694988_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=100&_nc_ohc=wtnCutSJxMsAX8rZBzi&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfAI0H5_DoTvShE86HpouTxZPmIVAcKYMGbpygwU1gwkNA&oe=65305BE2&_nc_sid=2999b8",
        timestamp: "2023-07-31T16:32:57.000Z",
        repliesCount: 0,
        replies: [],
        likesCount: 0,
      },
      {
        id: "17962862606612973",
        text: "😍",
        ownerUsername: "gladdyscedeno",
        ownerProfilePicUrl:
          "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/249024940_1004305340118798_915154299700641754_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=106&_nc_ohc=NKXVdFdib0gAX8LSIsL&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfBAxp6ttC-8Jssa97tZV0MBAH-FqNnamu9pUctGyXVbRw&oe=653136E3&_nc_sid=2999b8",
        timestamp: "2023-07-31T16:08:07.000Z",
        repliesCount: 0,
        replies: [],
        likesCount: 0,
      },
      {
        id: "18283813528133004",
        text: "@xx.1nathan8.xx",
        ownerUsername: "nancynathan1",
        ownerProfilePicUrl:
          "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/346285134_537190291733724_3351509603566998935_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=100&_nc_ohc=xCa51LRpVdMAX_TKqJt&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfA9e0v6W0m13NsitDUGkz-hqxzu6FbGStycK74oyt9k4Q&oe=653060F2&_nc_sid=2999b8",
        timestamp: "2023-07-31T14:37:34.000Z",
        repliesCount: 0,
        replies: [],
        likesCount: 1,
      },
      {
        id: "17893285880851024",
        text: "цікавий  акк  @the.inststories",
        ownerUsername: "devanshdixit30",
        ownerProfilePicUrl:
          "https://instagram.fupg6-1.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fupg6-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=ed9QgRqf6gEAX-Mwzck&edm=ALXcmt0BAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AfBKXqBSy7oN4IkqR6xi8VF3XmIx0WpPXVPU6oEWtI8hxA&oe=652FE84F&_nc_sid=06c8e0",
        timestamp: "2023-08-03T04:26:21.000Z",
        likesCount: 0,
      },
    ],
    dimensionsHeight: 1333,
    dimensionsWidth: 750,
    displayUrl:
      "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/364156504_1310239723259945_3538741663473176018_n.jpg?stp=dst-jpg_e15&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=8YLskTs99VwAX-vDUfW&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfBSOPa_G2YsxM9BbwJBaFk1arRmMwSkvVEy3bqu0gpUxQ&oe=652D6A58&_nc_sid=2999b8",
    images: [],
    videoUrl:
      "https://scontent-sjc3-1.cdninstagram.com/v/t50.2886-16/364331141_607976218093957_2951243832925502490_n.mp4?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=101&_nc_ohc=47vdUc0lZbkAX_Wh0Gm&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfBBEt21d6g5ASuRPVDv1gbnpVt8TyFvq-5u3a5uoiECKg&oe=652D1B7C&_nc_sid=2999b8",
    alt: null,
    likesCount: 5540,
    videoViewCount: 27706,
    videoPlayCount: 69593,
    timestamp: "2023-07-30T17:32:20.000Z",
    childPosts: [],
    ownerFullName: "MY CUTEST FRENCHIE 💖",
    ownerUsername: "mycutestfrenchie",
    ownerId: "4519263418",
    productType: "clips",
    videoDuration: 19.156,
    isSponsored: false,
    taggedUsers: [
      {
        full_name: "Dom the Dominator",
        id: "4635121565",
        is_verified: false,
        profile_pic_url:
          "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/21827279_762359513951425_5599477867432902656_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=101&_nc_ohc=w1CshAJK4KcAX_vyu7H&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfDvy9h3czv4MZEIA3nmG1ODuCCvOqwLAEUmKzuj8LNqaA&oe=65308072&_nc_sid=2999b8",
        username: "domwoof",
      },
    ],
  },
  {
    id: "3174399210699205898",
    type: "Video",
    shortCode: "CwNu0NxAa0K",
    caption:
      "I asked nicely the first time-MORE TREATS, NOW PLEASE!! @truman_frenchie\n.\n.\n.\n.\n.\n.\n.\n#bullyinstafeature #bulldogfrances #ブヒ#frenchiepup #bullygram #bullybreeds #愛犬 #bully #bullyworld #instafrenchie #불독 #bulldogfrancese #フレンチブルドッグ #bouledogue #french_bulldogs #bullynation #フレブル #bullylife #bulldogsofig #loveabully #adorabull",
    hashtags: [
      "bullyinstafeature",
      "bulldogfrances",
      "ブヒ",
      "frenchiepup",
      "bullygram",
      "bullybreeds",
      "愛犬",
      "bully",
      "bullyworld",
      "instafrenchie",
      "불독",
      "bulldogfrancese",
      "フレンチブルドッグ",
      "bouledogue",
      "french_bulldogs",
      "bullynation",
      "フレブル",
      "bullylife",
      "bulldogsofig",
      "loveabully",
      "adorabull",
    ],
    mentions: ["truman_frenchie"],
    url: "https://www.instagram.com/p/CwNu0NxAa0K/",
    commentsCount: 32,
    firstComment: "What a talker!!!",
    latestComments: [
      {
        id: "17947863878583964",
        text: "What a talker!!!",
        ownerUsername: "lovverofall_amimals",
        ownerProfilePicUrl:
          "https://instagram.fomr1-1.fna.fbcdn.net/v/t51.2885-19/361781839_825172625646226_6327565231239827591_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fomr1-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=kq-LH-VQGJcAX8XRGPd&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfCeLZ3NyxfIip4vZilEPm50PYGXtz_CEyT_STFZVlBf1Q&oe=65309C22&_nc_sid=2999b8",
        timestamp: "2023-09-13T04:33:10.000Z",
        likesCount: 0,
      },
      {
        id: "17875658354955503",
        text: "❤️❤️❤️",
        ownerUsername: "truntepeanut",
        ownerProfilePicUrl:
          "https://instagram.fomr1-1.fna.fbcdn.net/v/t51.2885-19/340339945_752325166306913_6193490810853736249_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fomr1-1.fna.fbcdn.net&_nc_cat=105&_nc_ohc=Aju59IAwB2IAX_pJVQo&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfDxlneWdLG6ShfK9_XrxE1FDZOJ9Adu3evAGvA9ibIn9A&oe=65302FE7&_nc_sid=2999b8",
        timestamp: "2023-09-08T22:01:59.000Z",
        likesCount: 0,
      },
      {
        id: "18274670635157306",
        text: "Je ne comprends pas ce qu’il veut dire 😂😂😂",
        ownerUsername: "charlot_murielle",
        ownerProfilePicUrl:
          "https://instagram.fomr1-1.fna.fbcdn.net/v/t51.2885-19/386728929_2410702935776493_2819171371209344587_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fomr1-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=3VkUXL2s29UAX9iGaEw&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfD1Wn-iX0pfNY_0e7JEij7wqFg_TEHjs5698CWOu5XBUA&oe=652F9FAB&_nc_sid=2999b8",
        timestamp: "2023-09-03T09:02:51.000Z",
        repliesCount: 0,
        replies: [],
        likesCount: 0,
      },
      {
        id: "17998291109087102",
        text: "😍❤️🙌// follow @dagoiabinha",
        ownerUsername: "nereida.rubio.313",
        ownerProfilePicUrl:
          "https://instagram.fomr1-1.fna.fbcdn.net/v/t51.2885-19/325182956_551248287042535_1603147944734038175_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fomr1-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=VBXxW0xo27wAX9CJFRj&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfCF7eitCYOcNVt-VR50YGsD39Sa6q4MDRs4zaYhNN1K0A&oe=652FAA77&_nc_sid=2999b8",
        timestamp: "2023-08-29T23:24:03.000Z",
        repliesCount: 0,
        replies: [],
        likesCount: 0,
      },
      {
        id: "18027326611557543",
        text: "❤️😂",
        ownerUsername: "lady.chaser.sky.bella.luna",
        ownerProfilePicUrl:
          "https://instagram.fomr1-1.fna.fbcdn.net/v/t51.2885-19/307989501_499501511569532_2255931106874555365_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fomr1-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=s5TsKbmS6VIAX8nxV8y&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfDYfvY3Fykm6X7a9DFO_nYb8PINGjWcgrwbichuAlqPpw&oe=653114CC&_nc_sid=2999b8",
        timestamp: "2023-08-27T17:43:49.000Z",
        repliesCount: 0,
        replies: [],
        likesCount: 0,
      },
      {
        id: "17991357953501043",
        text: "😂💖",
        ownerUsername: "nikkiahouse",
        ownerProfilePicUrl:
          "https://instagram.fomr1-1.fna.fbcdn.net/v/t51.2885-19/378853301_142579328926492_3137823125171379542_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fomr1-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=rOnFwDXwTugAX9aI2wd&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfB-0XuCpcEi67zX9YpwyCw0ET2xPs_rUQR4_ifPxpvrUQ&oe=6530E1B7&_nc_sid=2999b8",
        timestamp: "2023-08-25T07:17:47.000Z",
        repliesCount: 0,
        replies: [],
        likesCount: 0,
      },
      {
        id: "17868717920971940",
        text: "@rapalo.matheus",
        ownerUsername: "rapalovivian",
        ownerProfilePicUrl:
          "https://instagram.fomr1-1.fna.fbcdn.net/v/t51.2885-19/319005973_1195403004400715_3769719782700999477_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fomr1-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=2JbLfmLqPYUAX9sCQz8&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfAtaw4IUFvh4d44VD7imwbtY6mIhDCwbA_1RFK401PDWA&oe=65305D83&_nc_sid=2999b8",
        timestamp: "2023-08-23T19:06:51.000Z",
        repliesCount: 0,
        replies: [],
        likesCount: 0,
      },
      {
        id: "18061059601431003",
        text: "Gotta be a teenager with all that backtalk",
        ownerUsername: "christygrant",
        ownerProfilePicUrl:
          "https://instagram.fomr1-1.fna.fbcdn.net/v/t51.2885-19/371739134_3223716267935167_9122176172754573144_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fomr1-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=9qiN2TGoMIAAX_LWElH&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfCYESqBV77g-SVcfSauHh75djAzB5SJ82Jp1Yr6ZiDQYg&oe=65302C51&_nc_sid=2999b8",
        timestamp: "2023-08-23T17:11:35.000Z",
        repliesCount: 0,
        replies: [],
        likesCount: 0,
      },
      {
        id: "18069615049407922",
        text: "«HA YAA YAA YAA HA YA YA YA»",
        ownerUsername: "elin.oaa",
        ownerProfilePicUrl:
          "https://instagram.fomr1-1.fna.fbcdn.net/v/t51.2885-19/381400367_598734748920280_249694234457788447_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fomr1-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=oGh8hX2RPpkAX-7FGlk&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfDG7usg9Wz9nnWwURrQvhoITx0OBO9upuJ9g0N-Bz1Ofw&oe=6530010D&_nc_sid=2999b8",
        timestamp: "2023-08-22T21:12:23.000Z",
        repliesCount: 0,
        replies: [],
        likesCount: 0,
      },
      {
        id: "17942533382598192",
        text: "😍😍😍😍😍😍",
        ownerUsername: "amatriggerhippie",
        ownerProfilePicUrl:
          "https://instagram.fomr1-1.fna.fbcdn.net/v/t51.2885-19/101302044_1185940245086807_8983665930630332416_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fomr1-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=CAQzUuGNL1cAX9iKsXA&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfD-DsObt2muL_X50CofV_ZDB6JjeD4CloDUBdcTsjhyXw&oe=652FF437&_nc_sid=2999b8",
        timestamp: "2023-08-22T09:06:09.000Z",
        repliesCount: 0,
        replies: [],
        likesCount: 0,
      },
    ],
    dimensionsHeight: 1333,
    dimensionsWidth: 750,
    displayUrl:
      "https://instagram.fomr1-1.fna.fbcdn.net/v/t51.2885-15/368564002_1433585744153482_4993733692689260895_n.jpg?stp=dst-jpg_e15&_nc_ht=instagram.fomr1-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=W4l_VkYooR4AX_FqfX5&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfBXne9y9HWNCS2iCVzLuZrCcZIjy5r5dcljdiYnlkSc9Q&oe=652D2C04&_nc_sid=2999b8",
    images: [],
    videoUrl:
      "https://instagram.fomr1-1.fna.fbcdn.net/v/t66.30100-16/334205880_672133037824203_803407806777438456_n.mp4?_nc_ht=instagram.fomr1-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=ybNZ27TCIEUAX9h_Hff&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfBFsy9edifbo-eL4Dyg6jOj60oBS3jwfDl17IUIqVEcIg&oe=652D2CE7&_nc_sid=2999b8",
    alt: null,
    likesCount: 5016,
    videoViewCount: 21128,
    videoPlayCount: 58271,
    timestamp: "2023-08-21T17:12:09.000Z",
    childPosts: [],
    ownerFullName: "MY CUTEST FRENCHIE 💖",
    ownerUsername: "mycutestfrenchie",
    ownerId: "4519263418",
    productType: "clips",
    videoDuration: 26.818,
    isSponsored: false,
    taggedUsers: [
      {
        full_name: "Truman",
        id: "28992313253",
        is_verified: false,
        profile_pic_url:
          "https://instagram.fomr1-1.fna.fbcdn.net/v/t51.2885-19/82573386_2607548662701724_6605488031405178880_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fomr1-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=YQMG9UVR084AX-d0yBj&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfB-EV-hCQPZHUx8v_5BWRIrdaQ2w7elcad5zcgS7fPzMg&oe=6530D35E&_nc_sid=2999b8",
        username: "truman_frenchie",
      },
    ],
  },
  {
    id: "3210571909568763783",
    type: "Video",
    shortCode: "CyOPiQzsZeH",
    caption:
      "Mom bought us a chariot ⚙\n-\n🎥| Credit to @yumyum_mafia\n📲| Check their awesome page & give them a follow 📌\n.\n.\n.\n.\n.\n#etrike #dogsinbaskets #frenchies #frenchbulldog",
    hashtags: ["etrike", "dogsinbaskets", "frenchies", "frenchbulldog"],
    mentions: ["yumyum_mafia"],
    url: "https://www.instagram.com/p/CyOPiQzsZeH/",
    commentsCount: 48,
    firstComment:
      "Ваууу какие Шумахеры французские👍франи вы супер смешные и привет от французской банды ❤️❤️❤️❤️❤️❤️❤️❤️❤️",
    latestComments: [
      {
        id: "18037456237563146",
        text: "Ваууу какие Шумахеры французские👍франи вы супер смешные и привет от французской банды ❤️❤️❤️❤️❤️❤️❤️❤️❤️",
        ownerUsername: "frenchdullov",
        ownerProfilePicUrl:
          "https://scontent-iad3-2.cdninstagram.com/v/t51.2885-19/100948926_546562289582279_18213362869469184_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-iad3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=tqi6jY4GCiMAX_UeyXL&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfCMQBcKxgJvDe7JharVqPi89yly9XuEbyZEGiTLhgvAyA&oe=65305274&_nc_sid=2999b8",
        timestamp: "2023-10-13T07:16:11.000Z",
        likesCount: 0,
      },
      {
        id: "18385514146050797",
        text: "❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️",
        ownerUsername: "svitlana.sky",
        ownerProfilePicUrl:
          "https://scontent-iad3-1.cdninstagram.com/v/t51.2885-19/272682492_223532609991067_1848359437499144441_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=107&_nc_ohc=brB5Hb73fV0AX_GCQTi&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfDRSIe2HUVdfzTQRigMm6ovb3QvZdlVI7lThpGM-avR3g&oe=65317AC2&_nc_sid=2999b8",
        timestamp: "2023-10-13T06:36:59.000Z",
        repliesCount: 0,
        replies: [],
        likesCount: 1,
      },
      {
        id: "17894350949906503",
        text: "😍🔥😍",
        ownerUsername: "french_bulldog_coco_blue",
        ownerProfilePicUrl:
          "https://scontent-iad3-2.cdninstagram.com/v/t51.2885-19/358808445_179708351572035_6370435743772281706_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-iad3-2.cdninstagram.com&_nc_cat=103&_nc_ohc=8RTt2I6tmYMAX9-5YSq&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfDeBpzERx-2UI1NmaT6otJeXDEY_mTTc4m3Ut6ozm1DJg&oe=6530984F&_nc_sid=2999b8",
        timestamp: "2023-10-12T13:49:08.000Z",
        repliesCount: 0,
        replies: [],
        likesCount: 1,
      },
      {
        id: "18018502774832041",
        text: "me muero de amor 💕!!!",
        ownerUsername: "deliacomas",
        ownerProfilePicUrl:
          "https://scontent-iad3-1.cdninstagram.com/v/t51.2885-19/386594598_290772453722737_1903273027075292987_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=101&_nc_ohc=DSZqPb-gfdUAX9fc8Bi&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfAk9ccwyhNVttPBWwU-Q5UeiyaiPxXPsifJCASqQUQWUA&oe=652FC5FB&_nc_sid=2999b8",
        timestamp: "2023-10-12T09:21:38.000Z",
        repliesCount: 0,
        replies: [],
        likesCount: 1,
      },
      {
        id: "18042009556483700",
        text: "Very cute",
        ownerUsername: "krist33nruffles",
        ownerProfilePicUrl:
          "https://scontent-iad3-2.cdninstagram.com/v/t51.2885-19/239572077_139402748358335_3050937607383557860_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-iad3-2.cdninstagram.com&_nc_cat=111&_nc_ohc=wwqpH68vAHYAX91ClWB&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfBY03RmXgXnDbhFp2_U5OzhlOLVhZwLvUZH6yKKp3yHyA&oe=653176EE&_nc_sid=2999b8",
        timestamp: "2023-10-11T21:44:55.000Z",
        repliesCount: 0,
        replies: [],
        likesCount: 1,
      },
      {
        id: "17884261322943361",
        text: "❤️❤️❤️",
        ownerUsername: "_roma.frenchie_",
        ownerProfilePicUrl:
          "https://scontent-iad3-1.cdninstagram.com/v/t51.2885-19/275887343_2783410178628146_5760969650339306259_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=102&_nc_ohc=GMeWYSDt_iMAX-ogpiO&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfCxYoOcpuLcPhao6OjorDqfQqH9YUAIGCVG6DfxhDw9cw&oe=65312249&_nc_sid=2999b8",
        timestamp: "2023-10-11T19:40:34.000Z",
        repliesCount: 0,
        replies: [],
        likesCount: 1,
      },
      {
        id: "17977228346534353",
        text: "Was für coole Helme 😍",
        ownerUsername: "easy_0503bullylover",
        ownerProfilePicUrl:
          "https://scontent-iad3-1.cdninstagram.com/v/t51.2885-19/62272795_1023701401353208_758082790263619584_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=bI5XGawlBBUAX-bx56t&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfC4Kh0BsjWcjyfgssPOdk-R4Sy5jd3CWzM-3CWEp4sfgQ&oe=652FDD8B&_nc_sid=2999b8",
        timestamp: "2023-10-11T18:39:42.000Z",
        repliesCount: 0,
        replies: [],
        likesCount: 0,
      },
      {
        id: "17875491389972124",
        text: "Adorable",
        ownerUsername: "lfaysonrobbins",
        ownerProfilePicUrl:
          "https://scontent-iad3-1.cdninstagram.com/v/t51.2885-19/120042696_1014935645690373_8399861892072050351_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=PjIFSdBYKogAX-d6HNl&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfA4i1ahzh8hrQ2m3LbL2m0vQgnkAwTevuhDjrpuWxTARQ&oe=65306168&_nc_sid=2999b8",
        timestamp: "2023-10-11T17:34:15.000Z",
        repliesCount: 0,
        replies: [],
        likesCount: 1,
      },
      {
        id: "18021968371779886",
        text: "😍",
        ownerUsername: "chroniclesofpepper23",
        ownerProfilePicUrl:
          "https://scontent-iad3-2.cdninstagram.com/v/t51.2885-19/355040696_805924047613313_8043656324510210449_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-iad3-2.cdninstagram.com&_nc_cat=105&_nc_ohc=DneN6UnUuzgAX9n5Itj&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfCeK8TpUljdKwkiBEMRPsOH4AYAG2G7TakgKCgTLF54uQ&oe=65303A3E&_nc_sid=2999b8",
        timestamp: "2023-10-11T14:37:36.000Z",
        repliesCount: 0,
        replies: [],
        likesCount: 1,
      },
    ],
    dimensionsHeight: 1333,
    dimensionsWidth: 750,
    displayUrl:
      "https://scontent-iad3-2.cdninstagram.com/v/t51.2885-15/387708627_1025603188581521_3877847887834766130_n.jpg?stp=dst-jpg_e15&_nc_ht=scontent-iad3-2.cdninstagram.com&_nc_cat=105&_nc_ohc=rbFTHlDwRr0AX-OFsKk&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfAQlw1yrb7lS1EBK3lOC0p_P1ydUyhOo3JoBC1KHbqtYw&oe=652D00C0&_nc_sid=2999b8",
    images: [],
    videoUrl:
      "https://scontent-iad3-1.cdninstagram.com/v/t66.30100-16/10000000_1230799351734955_3023687561633856354_n.mp4?_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=107&_nc_ohc=aEbe3bv5zTAAX_ftbd_&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfBTpRMcQS0MVIVZdsoPEqMnXXWJst8O_wqi8hmL6HNw_g&oe=652D401E&_nc_sid=2999b8",
    alt: null,
    likesCount: 3968,
    videoViewCount: 15696,
    videoPlayCount: 40920,
    timestamp: "2023-10-10T15:01:45.000Z",
    childPosts: [],
    ownerFullName: "Frenchie Froggies™",
    ownerUsername: "frenchiefroggies",
    ownerId: "6506886831",
    productType: "clips",
    videoDuration: 38.614,
    isSponsored: false,
    taggedUsers: [
      {
        full_name: "Miss Picklez and Miss Buttersworth",
        id: "9258632372",
        is_verified: false,
        profile_pic_url:
          "https://scontent-iad3-1.cdninstagram.com/v/t51.2885-19/381731123_882362236842916_5415045785883156362_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=tUSBx75Y1zIAX-4vcFg&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfB9vz8LdjRuPG6hOmRMsK-PGK7QVnajqoKj3uvg2QZkag&oe=6530CCFE&_nc_sid=2999b8",
        username: "yumyum_mafia",
      },
    ],
  },
  {
    id: "3164989680293604362",
    type: "Video",
    shortCode: "CvsTVhrrWwK",
    caption:
      "Bet cha NEVER seen it done that way before 💩 @fuku_sapporo\n\n.\n.\n.\n.\n.\n.\n.\n#bullyinstafeature #bulldogfrances #ブヒ#frenchiepup #bullygram #bullybreeds #愛犬 #bully #bullyworld #instafrenchie #불독 #bulldogfrancese #フレンチブルドッグ #bouledogue #french_bulldogs #bullynation #フレブル #bullylife #bulldogsofig #loveabully #adorabull",
    hashtags: [
      "bullyinstafeature",
      "bulldogfrances",
      "ブヒ",
      "frenchiepup",
      "bullygram",
      "bullybreeds",
      "愛犬",
      "bully",
      "bullyworld",
      "instafrenchie",
      "불독",
      "bulldogfrancese",
      "フレンチブルドッグ",
      "bouledogue",
      "french_bulldogs",
      "bullynation",
      "フレブル",
      "bullylife",
      "bulldogsofig",
      "loveabully",
      "adorabull",
    ],
    mentions: ["fuku_sapporo"],
    url: "https://www.instagram.com/p/CvsTVhrrWwK/",
    commentsCount: 48,
    firstComment: "@aaa.nue @tish.rdrgz 😂",
    latestComments: [
      {
        id: "17980613573185862",
        text: "@aaa.nue @tish.rdrgz 😂",
        ownerUsername: "j0hnnyn",
        ownerProfilePicUrl:
          "https://scontent-man2-1.cdninstagram.com/v/t51.2885-19/361952056_1314179209197632_1482662226500634801_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-man2-1.cdninstagram.com&_nc_cat=108&_nc_ohc=TVno9ZMNQk8AX8-7JO1&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfAD-8Y_ipXH7hw3zJTGp4_srcOCnanlqZFWtglInMib-w&oe=652FE5AE&_nc_sid=2999b8",
        timestamp: "2023-08-11T17:07:32.000Z",
        likesCount: 0,
      },
      {
        id: "17979850253459049",
        text: "@marcoreiche verblüffende Ähnlichkeit mit dir😂😂😂😂",
        ownerUsername: "christoph__12",
        ownerProfilePicUrl:
          "https://scontent-man2-1.cdninstagram.com/v/t51.2885-19/80433275_2388029838176115_3250975147091296256_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-man2-1.cdninstagram.com&_nc_cat=103&_nc_ohc=QzrwakryZw8AX_gxaLL&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfBdkF0gRrVUSG8O-oXPCyffrkE6Q5cRtl5AKWrCwLz9mQ&oe=6530991C&_nc_sid=2999b8",
        timestamp: "2023-08-11T08:09:22.000Z",
        repliesCount: 2,
        replies: [
          {
            id: "17965897460422475",
            text: "@christoph__12 🤣ich hab schon überlegt ob ich dir nicht so ans Bein pisse 🤣",
            ownerUsername: "marcoreiche",
            ownerProfilePicUrl:
              "https://scontent-man2-1.cdninstagram.com/v/t51.2885-19/360809953_1422973898495288_6700700468028661757_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-man2-1.cdninstagram.com&_nc_cat=108&_nc_ohc=ReecPE4Ju10AX-yNgPi&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfBu6iw1u_7qBJFF2fxZxGbpgddTCjZ0uUGzFsTfHPsD6Q&oe=6530A755&_nc_sid=2999b8",
            timestamp: "2023-08-11T08:35:49.000Z",
            likesCount: 0,
          },
          {
            id: "18076126183376449",
            text: "@marcoreiche sau stark😂😂😂",
            ownerUsername: "christoph__12",
            ownerProfilePicUrl:
              "https://scontent-man2-1.cdninstagram.com/v/t51.2885-19/80433275_2388029838176115_3250975147091296256_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-man2-1.cdninstagram.com&_nc_cat=103&_nc_ohc=QzrwakryZw8AX_gxaLL&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfBdkF0gRrVUSG8O-oXPCyffrkE6Q5cRtl5AKWrCwLz9mQ&oe=6530991C&_nc_sid=2999b8",
            timestamp: "2023-08-11T08:55:52.000Z",
            likesCount: 1,
          },
        ],
        likesCount: 0,
      },
      {
        id: "17945459789676704",
        text: "Lmao yup! I have one that poops standing up 🤷🏻‍♀️",
        ownerUsername: "jeng1255",
        ownerProfilePicUrl:
          "https://scontent-man2-1.cdninstagram.com/v/t51.2885-19/275101601_3485690361554702_7985489294584248520_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-man2-1.cdninstagram.com&_nc_cat=102&_nc_ohc=N7kZG1E3Y_UAX_3W19T&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfClqrv6zrDObBFmGtONHwC9wxBgjqBdgABSxP5tHLlmEQ&oe=653148EA&_nc_sid=2999b8",
        timestamp: "2023-08-10T23:43:42.000Z",
        repliesCount: 0,
        replies: [],
        likesCount: 1,
      },
      {
        id: "17978327963230141",
        text: "Brother, is that you",
        ownerUsername: "brubrucachu",
        ownerProfilePicUrl:
          "https://scontent-man2-1.cdninstagram.com/v/t51.2885-19/41606828_2179827188948281_6469231899041595392_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-man2-1.cdninstagram.com&_nc_cat=101&_nc_ohc=jo9uAphFI8UAX_8yCt3&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfDikZWnzO2pnMf9ANKGUTYJPGRw1jJvIly4AGjrP0VBaw&oe=6530BA33&_nc_sid=2999b8",
        timestamp: "2023-08-10T16:15:45.000Z",
        repliesCount: 0,
        replies: [],
        likesCount: 0,
      },
      {
        id: "17991348914126982",
        text: "@voicepeter dit zou mila ook doen hahaha",
        ownerUsername: "vanderwelnijman",
        ownerProfilePicUrl:
          "https://scontent-man2-1.cdninstagram.com/v/t51.2885-19/377287647_322352940310046_5182206420864444867_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-man2-1.cdninstagram.com&_nc_cat=102&_nc_ohc=zL13BiVjNLEAX_mZRlz&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfDGeLPY-8E7uZvTC_-rRIW2YOEbuAMYr-Vjxvk-uBheCw&oe=65310FE6&_nc_sid=2999b8",
        timestamp: "2023-08-10T08:08:52.000Z",
        repliesCount: 0,
        replies: [],
        likesCount: 0,
      },
      {
        id: "17969921216591547",
        text: "@zorckdlayaute pffff 😄",
        ownerUsername: "hindi_la_belle_vie",
        ownerProfilePicUrl:
          "https://scontent-man2-1.cdninstagram.com/v/t51.2885-19/11137659_933746566657062_1316770967_a.jpg?_nc_ht=scontent-man2-1.cdninstagram.com&_nc_cat=106&_nc_ohc=723XRnHfUQEAX_uRJd_&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfB-CvFraykUWncFsSvKhOFTTZzXjTENG4fNTN1tmfQEQg&oe=6530B0BB&_nc_sid=2999b8",
        timestamp: "2023-08-10T06:56:13.000Z",
        repliesCount: 0,
        replies: [],
        likesCount: 0,
      },
      {
        id: "17991711722156931",
        text: "😂",
        ownerUsername: "zuleyka_4ever_santiago",
        ownerProfilePicUrl:
          "https://scontent-man2-1.cdninstagram.com/v/t51.2885-19/197305921_283255813510888_5910604090569633497_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-man2-1.cdninstagram.com&_nc_cat=104&_nc_ohc=8Qtp-NcSdHcAX_c32op&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfBOazrkx2uQofBBn_UsFgJzzfM_xzfza0SpJMZl8F0POQ&oe=6530FB18&_nc_sid=2999b8",
        timestamp: "2023-08-09T22:24:52.000Z",
        repliesCount: 0,
        replies: [],
        likesCount: 0,
      },
      {
        id: "17947146203556516",
        text: "@j0hnnyn bro 😂😭 LMAOO",
        ownerUsername: "tish.rdrgz",
        ownerProfilePicUrl:
          "https://scontent-man2-1.cdninstagram.com/v/t51.2885-19/278426554_707012900734556_7301920889524999089_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-man2-1.cdninstagram.com&_nc_cat=108&_nc_ohc=aNs486Z9ZsUAX8khuhr&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfD3AEe7Lw-2B1GJIZBc5GivIysvDmLc0NavRE4FvKeD8Q&oe=6530105E&_nc_sid=2999b8",
        timestamp: "2023-08-11T17:08:34.000Z",
        likesCount: 0,
      },
    ],
    dimensionsHeight: 1333,
    dimensionsWidth: 750,
    displayUrl:
      "https://scontent-man2-1.cdninstagram.com/v/t51.2885-15/365876900_604225525198352_6067062478167884391_n.jpg?stp=dst-jpg_e15&_nc_ht=scontent-man2-1.cdninstagram.com&_nc_cat=108&_nc_ohc=b6dcDuacuyoAX-NZ9eH&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfCKHOuNwlSfzZBNrWt0IqsesHy9L5R6VDkABxR0wRif2w&oe=652D324E&_nc_sid=2999b8",
    images: [],
    videoUrl:
      "https://scontent-man2-1.cdninstagram.com/v/t66.30100-16/311193641_630281845750333_7292993681314826131_n.mp4?_nc_ht=scontent-man2-1.cdninstagram.com&_nc_cat=101&_nc_ohc=QSdxyTYpESUAX_PHkzn&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfDgMW07dActXD66xsq-U2MQBY7-43ag3r_MlQG-fAK6oQ&oe=652D7D09&_nc_sid=2999b8",
    alt: null,
    likesCount: 2959,
    videoViewCount: 46141,
    videoPlayCount: 90878,
    timestamp: "2023-08-08T17:36:59.000Z",
    childPosts: [],
    ownerFullName: "MY CUTEST FRENCHIE 💖",
    ownerUsername: "mycutestfrenchie",
    ownerId: "4519263418",
    productType: "clips",
    videoDuration: 10.796,
    isSponsored: false,
    taggedUsers: [
      {
        full_name: "ふく",
        id: "52931631416",
        is_verified: false,
        profile_pic_url:
          "https://scontent-man2-1.cdninstagram.com/v/t51.2885-19/279699237_396993738773292_4959691435972704210_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-man2-1.cdninstagram.com&_nc_cat=1&_nc_ohc=1uRfYrYrfRUAX84pgtd&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfAANuZb108Y2BFy1m2B9jYmnzQ5_FOdAPJAbgfSGnZFQw&oe=65314562&_nc_sid=2999b8",
        username: "fuku_sapporo",
      },
    ],
  },
];

module.exports = { getReelsFromApify };
