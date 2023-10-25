interface CommentReply {
    id: string;
    text: string;
    ownerUsername: string;
    ownerProfilePicUrl: string;
    timestamp: string;
    likesCount: number;
}

interface Comment {
    id: string;
    text: string;
    ownerUsername: string;
    ownerProfilePicUrl: string;
    timestamp: string;
    likesCount: number;
    repliesCount: number;
    replies?: CommentReply[];
}

interface InstagramPost {
    id: string;
    type: string;
    shortCode: string;
    caption: string;
    hashtags: string[];
    mentions: string[];
    url: string;
    commentsCount: number;
    firstComment: string;
    latestComments: Comment[];
    dimensionsHeight: number,
    dimensionsWidth: number,
    displayUrl: string
    images: [],
    videoUrl: string
    alt: null,
    likesCount: number,
    videoViewCount: number,
    videoPlayCount: number,
    timestamp: string,
    childPosts: [],
    ownerFullName: string,
    ownerUsername: string,
    ownerId: string,
    productType: string,
    videoDuration: number,
    isSponsored: boolean,
    taggedUsers: TaggedUser[
    ]
}

interface TaggedUser {
    full_name: string,
    id: string,
    is_verified: boolean,
    profile_pic_url: string,
    username: string,
}

interface InstagramPage {
    username: string,
    followersCount: number
}

// {
//     id: "3158464372962798521",
//     type: "Video",
//     shortCode: "CvVHpzqLKu5",
//     caption:
//       "My Sunday plan 😴 @domwoof\n.\n.\n.\n.\n.\n.\n.\n#bullyinstafeature #bulldogfrances #ブヒ#frenchiepup #bullygram #bullybreeds #愛犬 #bully #bullyworld #instafrenchie #불독 #bulldogfrancese #フレンチブルドッグ #bouledogue #french_bulldogs #bullynation #フレブル #bullylife #bulldogsofig #loveabully #adorabull",
//     hashtags: [
//       "bullyinstafeature",
//       "bulldogfrances",
//       "ブヒ",
//       "frenchiepup",
//       "bullygram",
//       "bullybreeds",
//       "愛犬",
//       "bully",
//       "bullyworld",
//       "instafrenchie",
//       "불독",
//       "bulldogfrancese",
//       "フレンチブルドッグ",
//       "bouledogue",
//       "french_bulldogs",
//       "bullynation",
//       "フレブル",
//       "bullylife",
//       "bulldogsofig",
//       "loveabully",
//       "adorabull",
//     ],
//     mentions: ["domwoof"],
//     url: "https://www.instagram.com/p/CvVHpzqLKu5/",
//     commentsCount: 52,
//     firstComment: "@josh.sven",
//     latestComments: [
//       {
//         id: "17995175471189491",
//         text: "@josh.sven",
//         ownerUsername: "christinesinner",
//         ownerProfilePicUrl:
//           "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/372439137_3518079558403956_5061571209560675855_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=100&_nc_ohc=7K1XxfXGHhkAX_A2rBT&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfBAMtnaDMoSFnTTEQqWApLC-ynTuIfF-Fyrg4-o5hSmZA&oe=652FE5D4&_nc_sid=2999b8",
//         timestamp: "2023-09-27T02:16:20.000Z",
//         likesCount: 0,
//       },
//       {
//         id: "17978185298374007",
//         text: "🥰🥰🥰",
//         ownerUsername: "beataduracova",
//         ownerProfilePicUrl:
//           "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/258354528_1383470542070352_6505815152976066898_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=100&_nc_ohc=e-OK9qEj5pQAX8AEwuT&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfATg9LUU_oAFsV-aMeZvtteCyJso857u7m9k7GzkJKCHw&oe=6530D706&_nc_sid=2999b8",
//         timestamp: "2023-08-02T13:29:31.000Z",
//         repliesCount: 1,
//         replies: [
//           {
//             id: "17893285880851024",
//             text: "цікавий  акк  @the.inststories",
//             ownerUsername: "devanshdixit30",
//             ownerProfilePicUrl:
//               "https://instagram.fupg6-1.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fupg6-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=ed9QgRqf6gEAX-Mwzck&edm=ALXcmt0BAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AfBKXqBSy7oN4IkqR6xi8VF3XmIx0WpPXVPU6oEWtI8hxA&oe=652FE84F&_nc_sid=06c8e0",
//             timestamp: "2023-08-03T04:26:21.000Z",
//             likesCount: 0,
//           },
//         ],
//         likesCount: 0,
//       },
//       {
//         id: "18018980671713931",
//         text: "😂",
//         ownerUsername: "poppyandpringlefrenchies",
//         ownerProfilePicUrl:
//           "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/260851569_1330771587376972_8308628065049133648_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=104&_nc_ohc=yq-n4MXWy6sAX9mYlgI&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfBJzal9QnR8R7kPOjMsIlk1a_FTsc0V13Kf9EH5-6E0Dw&oe=6531277D&_nc_sid=2999b8",
//         timestamp: "2023-08-01T18:30:52.000Z",
//         repliesCount: 0,
//         replies: [],
//         likesCount: 0,
//       },
//       {
//         id: "18004159420785792",
//         text: "@gabrielaflores2357",
//         ownerUsername: "calvin__leo_ramos",
//         ownerProfilePicUrl:
//           "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/320972444_552382106737739_8837322179411395746_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=111&_nc_ohc=pA5Tl0oMFrkAX95eQLd&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfA11iYQITCiCjbm0cfAKzDrydG5M0G2ejn4_waa2xXdGg&oe=65311EC3&_nc_sid=2999b8",
//         timestamp: "2023-08-01T18:25:49.000Z",
//         repliesCount: 0,
//         replies: [],
//         likesCount: 0,
//       },
//       {
//         id: "17947638392535683",
//         text: "❤️❤️❤️",
//         ownerUsername: "domwoof",
//         ownerProfilePicUrl:
//           "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/21827279_762359513951425_5599477867432902656_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=101&_nc_ohc=w1CshAJK4KcAX_vyu7H&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfDvy9h3czv4MZEIA3nmG1ODuCCvOqwLAEUmKzuj8LNqaA&oe=65308072&_nc_sid=2999b8",
//         timestamp: "2023-08-01T10:46:55.000Z",
//         repliesCount: 0,
//         replies: [],
//         likesCount: 0,
//       },
//       {
//         id: "17986492685266164",
//         text: "🤣🤣🤣🤣🥰🥰🥰🥰🥰🥰🥰🥰🥰❤️❤️❤️❤️❤️❤️❤️",
//         ownerUsername: "marigarciasosa",
//         ownerProfilePicUrl:
//           "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/329617291_105777459103326_4241681448857705715_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=106&_nc_ohc=07G2zKoBmvMAX8cfX0Z&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfCsMxN-IHNhJqdoSxD0jXbJbymbQwNtSUMVH7e9a9woxQ&oe=65315F0F&_nc_sid=2999b8",
//         timestamp: "2023-07-31T19:22:05.000Z",
//         repliesCount: 0,
//         replies: [],
//         likesCount: 0,
//       },
//       {
//         id: "17964158258610672",
//         text: "@michael_delloiacono",
//         ownerUsername: "tiffany_delloiacono",
//         ownerProfilePicUrl:
//           "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/248874517_143563157998332_6481321928153694988_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=100&_nc_ohc=wtnCutSJxMsAX8rZBzi&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfAI0H5_DoTvShE86HpouTxZPmIVAcKYMGbpygwU1gwkNA&oe=65305BE2&_nc_sid=2999b8",
//         timestamp: "2023-07-31T16:32:57.000Z",
//         repliesCount: 0,
//         replies: [],
//         likesCount: 0,
//       },
//       {
//         id: "17962862606612973",
//         text: "😍",
//         ownerUsername: "gladdyscedeno",
//         ownerProfilePicUrl:
//           "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/249024940_1004305340118798_915154299700641754_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=106&_nc_ohc=NKXVdFdib0gAX8LSIsL&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfBAxp6ttC-8Jssa97tZV0MBAH-FqNnamu9pUctGyXVbRw&oe=653136E3&_nc_sid=2999b8",
//         timestamp: "2023-07-31T16:08:07.000Z",
//         repliesCount: 0,
//         replies: [],
//         likesCount: 0,
//       },
//       {
//         id: "18283813528133004",
//         text: "@xx.1nathan8.xx",
//         ownerUsername: "nancynathan1",
//         ownerProfilePicUrl:
//           "https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/346285134_537190291733724_3351509603566998935_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=100&_nc_ohc=xCa51LRpVdMAX_TKqJt&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfA9e0v6W0m13NsitDUGkz-hqxzu6FbGStycK74oyt9k4Q&oe=653060F2&_nc_sid=2999b8",
//         timestamp: "2023-07-31T14:37:34.000Z",
//         repliesCount: 0,
//         replies: [],
//         likesCount: 1,
//       },
//       {
//         id: "17893285880851024",
//         text: "цікавий  акк  @the.inststories",
//         ownerUsername: "devanshdixit30",
//         ownerProfilePicUrl:
//           "https://instagram.fupg6-1.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fupg6-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=ed9QgRqf6gEAX-Mwzck&edm=ALXcmt0BAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AfBKXqBSy7oN4IkqR6xi8VF3XmIx0WpPXVPU6oEWtI8hxA&oe=652FE84F&_nc_sid=06c8e0",
//         timestamp: "2023-08-03T04:26:21.000Z",
//         likesCount: 0,
//       },
//     ],

//   }

