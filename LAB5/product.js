// product.js

function getProductDetails(productId) {
  axios
      .get(`http://localhost:3100/product/${productId}`)
      .then((response) => {
          const product = response.data;
          displayProduct(product);
      })
      .catch((error) => {
          console.error(error);
      });
}

function displayProduct(product) {
  const titleElement = document.getElementById("product-title");
  const descriptionElement = document.getElementById("product-description");
  const priceElement = document.getElementById("product-price");
  const imageElement = document.getElementById("product-image");

  titleElement.textContent = product.product_title;
  descriptionElement.textContent = product.product_description;
  priceElement.textContent = product.product_price;
  imageElement.src = product.product_image;
  imageElement.alt = product.product_title;
}

// Get the product ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");

if (productId) {
  getProductDetails(productId);
}

// JSON 파일 경로
const jsonFile = "http://localhost:8000/reviews.json";

// JSON 파일에서 특정 상품의 리뷰 데이터를 가져와서 화면에 표시하는 함수
function displayReviews(productId) {

    axios.get(jsonFile)
        .then(response => {
            const reviews = response.data;
            const filteredReviews = reviews[productId]
            const reviewList = document.getElementById("review-list");
            reviewList.innerHTML = "";

            filteredReviews.forEach(review => {

                const li = document.createElement("li");
                li.innerText = "평점 : " + review.review_rating + "\n" + review.review_text +"\n";

                reviewList.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Error retrieving reviews:", error);
        });
}

// JSON 파일에 특정 상품의 새로운 리뷰를 추가하는 함수
function addReview( content, rating, productId) {
    const newReview = {
        content: content,
        rating: rating,
        productId: productId
    };
    console.log('product js posting : ', newReview)
    axios.post('http://localhost:3100/reviews', newReview)
        .then(() => {
            displayReviews(productId);
        })
        .catch(error => {
            console.error("Error updating reviews:", error);
        });
  }
  

// 제품 정보를 설정하고 리뷰를 표시하는 함수
function setupProduct() {
  const productTitle = document.getElementById("product-title");
  const productDescription = document.getElementById("product-description");
  const productPrice = document.getElementById("product-price");
  const productImage = document.getElementById("product-image");

  // 제품 정보 설정
  productTitle.innerText = "제품 제목";
  productDescription.innerText = "제품 설명";
  productPrice.innerText = "제품 가격";
  productImage.src = "이미지 URL";

  if (productId) {
    getProductDetails(productId);
    displayReviews(productId);
  }
  
  document.getElementById("review-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const rating = document.getElementById("review-rating").value;
    const content = document.getElementById("review-content").value;
    addReview(content,rating,  productId);
    document.getElementById("review-form").reset();
  });
  
}

// 리뷰 작성 폼 제출 이벤트 핸들러
// document.getElementById("review-form").addEventListener("submit", function (event) {
//   event.preventDefault();
//   const rating = document.getElementById("review-rating").value;
//   const content = document.getElementById("review-content").value;
//   addReview(rating, content, productId);
//   document.getElementById("review-form").reset();
// });

// 페이지 로드 시 제품 설정 및 리뷰 표시
window.addEventListener("load", setupProduct);
