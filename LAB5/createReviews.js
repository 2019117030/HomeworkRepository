const fs = require('fs');

// 상품별 리뷰 정보를 담는 객체
let reviewsByProductId = {};

const jsonData = [
    {
        "product_id": 1,
        "product_price": 10000,
        "product_image": "./images/stone1.jpeg",
        "product_category": "basic",
        "product_title": "Althea",
        "product_description": "As I was going down impassive Rivers,\nI no longer felt myself guided by haulers:"
    },
    {
        "product_id": 2,
        "product_price": 20000,
        "product_image": "./images/stone2.png",
        "product_category": "basic",
        "product_title": "Theseus",
        "product_description": "Yelping redskins had taken them as targets\nAnd had nailed them naked to colored stakes."
    },
    {
        "product_id": 3,
        "product_price": 40000,
        "product_image": "./images/stone3.png",
        "product_category": "basic",
        "product_title": "Persephone",
        "product_description": "I was indifferent to all crews,\nThe bearer of Flemish wheat or English cottons"
    },
    {
        "product_id": 4,
        "product_price": 9000,
        "product_image": "./images/stone4.png",
        "product_category": "unique",
        "product_title": "Delphi",
        "product_description": "When with my haulers this uproar stopped\nThe Rivers let me go where I wanted."
    },
    {
        "product_id": 5,
        "product_price": 17000,
        "product_image": "./images/stone5.png",
        "product_category": "unique",
        "product_title": "Leanos",
        "product_description": "Into the furious lashing of the tides\nMore heedless than children's brains the other winter"
    },
    {
        "product_id": 6,
        "product_price": 27000,
        "product_image": "./images/stone6.png",
        "product_category": "basic",
        "product_title": "Icarus",
        "product_description": "I ran! And loosened Peninsulas\nHave not undergone a more triumphant hubbub"
    },
    {
        "product_id": 7,
        "product_price": 13000,
        "product_image": "./images/stone7.jpeg",
        "product_category": "basic",
        "product_title": "Eugenio",
        "product_description": "The storm blessed my sea vigils\nLighter than a cork I danced on the waves"
    },
    {
        "product_id": 8,
        "product_price": 15000,
        "product_image": "./images/stone8.png",
        "product_category": "unique",
        "product_title": "Cassius",
        "product_description": "That are called eternal rollers of victims,\nTen nights, without missing the stupid eye of the lighthouses!"
    },
    {
        "product_id": 9,
        "product_price": 10000,
        "product_image": "./images/stone9.png",
        "product_category": "unique",
        "product_title": "Archimedes",
        "product_description": "Sweeter than the flesh of hard apples is to children\nThe green water penetrated my hull of fir"
    },
    {
        "product_id": 10,
        "product_price": 50000,
        "product_image": "./images/stone10.png",
        "product_category": "basic",
        "product_title": "Theodoros",
        "product_description": "And washed me of spots of blue wine\nAnd vomit, scattering rudder and grappling-hook"
    },
    {
        "product_id": 11,
        "product_price": 200000,
        "product_image": "./images/stone11.png",
        "product_category": "unique",
        "product_title": "Maximus",
        "product_description": "And from then on I bathed in the Poem\nOf the Sea, infused with stars and lactescent,"
    }
]


// 각 상품에 대해 임의의 리뷰 정보를 생성
jsonData.forEach((data) => {
    const { product_id } = data;
  
    // 리뷰 정보는 임의로 생성합니다.
    // 실제 리뷰 데이터를 사용하려면 이 부분을 수정하십시오.
    let reviews = [];
    for (let i = 0; i < 5; i++) { // 각 상품별로 5개의 리뷰를 생성합니다.
        reviews.push({
            review_id: i,
            review_text: `This is review ${i} for product ${product_id}.`,
            review_rating: Math.floor(Math.random() * 5) + 1 // 1부터 5까지의 임의의 별점을 생성합니다.
        });
    }

    // 생성된 리뷰 정보를 해당 상품 ID의 키로 가지는 객체에 추가합니다.
    reviewsByProductId[product_id] = reviews;
});

// JSON 파일에 쓸 수 있는 형태의 문자열로 변환합니다.
let reviewsData = JSON.stringify(reviewsByProductId, null, 2);

// reviews.json 파일에 리뷰 정보를 씁니다.
fs.writeFile('reviews.json', reviewsData, (err) => {
    if (err) throw err;
    console.log('Reviews data has been saved to reviews.json.');
});