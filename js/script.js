(function ($) {

  "use strict";

  var initPreloader = function () {
    $(document).ready(function ($) {
      var Body = $('body');
      Body.addClass('preloader-site');
    });
    $(window).load(function () {
      $('.preloader-wrapper').fadeOut();
      $('body').removeClass('preloader-site');
    });
  }

  // init Chocolat light box
  var initChocolat = function () {
    Chocolat(document.querySelectorAll('.image-link'), {
      imageSize: 'contain',
      loop: true,
    })
  }

  var initSwiper = function () {

    var swiper = new Swiper(".main-swiper", {
      speed: 500,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    var category_swiper = new Swiper(".category-carousel", {
      slidesPerView: 6,
      spaceBetween: 30,
      speed: 500,
      navigation: {
        nextEl: ".category-carousel-next",
        prevEl: ".category-carousel-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
        1500: {
          slidesPerView: 6,
        },
      }
    });

    var brand_swiper = new Swiper(".brand-carousel", {
      slidesPerView: 4,
      spaceBetween: 30,
      speed: 500,
      navigation: {
        nextEl: ".brand-carousel-next",
        prevEl: ".brand-carousel-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 3,
        },
        1500: {
          slidesPerView: 4,
        },
      }
    });

    var products_swiper = new Swiper(".products-carousel", {
      slidesPerView: 5,
      spaceBetween: 30,
      speed: 500,
      navigation: {
        nextEl: ".products-carousel-next",
        prevEl: ".products-carousel-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
        1500: {
          slidesPerView: 6,
        },
      }
    });
  }

  var initProductQty = function () {

    $('.product-qty').each(function () {

      var $el_product = $(this);
      var quantity = 0;

      $el_product.find('.quantity-right-plus').click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find('#quantity').val());
        $el_product.find('#quantity').val(quantity + 1);
      });

      $el_product.find('.quantity-left-minus').click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find('#quantity').val());
        if (quantity > 0) {
          $el_product.find('#quantity').val(quantity - 1);
        }
      });

    });

  }

  // init jarallax parallax
  var initJarallax = function () {
    jarallax(document.querySelectorAll(".jarallax"));

    jarallax(document.querySelectorAll(".jarallax-keep-img"), {
      keepImg: true,
    });
  }

  // document ready
  $(document).ready(function () {

    initPreloader();
    initSwiper();
    initProductQty();
    initJarallax();
    initChocolat();

  }); // End of a document

})(jQuery);

// Carrega o carrinho salvo ou cria um novo
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsList = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

const cartCanvas = new bootstrap.Offcanvas('#offcanvasCart');

// Adiciona ao carrinho
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.getAttribute("data-name");
    const price = parseFloat(btn.getAttribute("data-price"));
    cart.push({ name, price });
    renderCart();
    cartCanvas.show(); // Abre o carrinho automaticamente
  });
});

function renderCart() {
  cartItemsList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center lh-sm";
    li.innerHTML = `
      <div>
        <h6 class="my-0">${item.name}</h6>
        <small class="text-body-secondary">Produto Digital</small>
      </div>
      <div class="d-flex align-items-center gap-2">
        <span class="text-body-secondary">R$ ${item.price.toFixed(2)}</span>
        <button class="btn btn-sm btn-outline-danger remove-item" data-index="${index}">&times;</button>
      </div>
    `;
    cartItemsList.appendChild(li);
    total += item.price;
  });

  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.length;
  document.getElementById("cart-button-total").textContent = `R$ ${total.toFixed(2)}`;

  // 🔐 Salva no localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // 🔄 Botões de remoção
  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", () => {
      const index = parseInt(button.getAttribute("data-index"));
      cart.splice(index, 1);
      renderCart();
    });
  });
}

// 🔁 Rendeza carrinho ao carregar a página
renderCart();


const searchInput = document.getElementById("search-input");
const searchSuggestions = document.getElementById("search-suggestions");

const produtos = [
  { nome: "the last of us part I", id: "produto-the-last-of-us" },
  { nome: "god of war ragnarok", id: "produto-gow-ragnarok" },
  { nome: "spider-man 2", id: "produto-spiderman2" },
  { nome: "elden ring", id: "produto-elden-ring" },
  { nome: "final fantasy xvi", id: "produto-ffxvi" },
  { nome: "resident evil 4 remake", id: "produto-re4-remake" },
  { nome: "call of duty mw3", id: "produto-cod-mw3" },
  { nome: "gran turismo 7", id: "produto-gt7" },
  { nome: "mortal kombat 1", id: "produto-mk1" },
  { nome: "horizon forbidden west", id: "produto-horizon" },

  // Funkos
  { nome: "funko kratos", id: "produto-funko-kratos" },
  { nome: "funko venom", id: "produto-funko-venom" },
  { nome: "funko batman", id: "produto-funko-batman" },
  { nome: "funko spiderman", id: "produto-funko-spiderman" },
  { nome: "funko iron man", id: "produto-funko-ironman" },
  { nome: "funko darth vader", id: "produto-funko-darthvader" },
  { nome: "funko goku", id: "produto-funko-goku" },
  { nome: "funko vegeta", id: "produto-funko-vegeta" },
  { nome: "funko harry potter", id: "produto-funko-harrypotter" },
  { nome: "funko eleven", id: "produto-funko-eleven" }
];

searchInput.addEventListener("input", function () {
  const termo = this.value.trim().toLowerCase();
  searchSuggestions.innerHTML = "";

  if (termo.length < 2) return;

  const sugestoes = produtos.filter(produto => produto.nome.includes(termo));

  if (sugestoes.length === 0) {
    searchSuggestions.innerHTML = `<li class="list-group-item disabled">Nenhum produto encontrado</li>`;
    return;
  }

  sugestoes.forEach(produto => {
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-action";
    li.textContent = produto.nome;
    li.addEventListener("click", () => {
      const el = document.getElementById(produto.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        searchInput.value = produto.nome;
        searchSuggestions.innerHTML = "";
      }
    });
    searchSuggestions.appendChild(li);
  });
});

// Oculta as sugestões quando clica fora
document.addEventListener("click", (e) => {
  if (!document.getElementById("search-form").contains(e.target)) {
    searchSuggestions.innerHTML = "";
  }
});

document.getElementById('search-form').addEventListener('submit', function(e) {
  e.preventDefault();
});

const offcanvasSearchInput = document.getElementById("offcanvas-search-input");
const offcanvasSearchBtn = document.getElementById("offcanvas-search-btn");

offcanvasSearchBtn.addEventListener("click", () => {
  const termo = offcanvasSearchInput.value.trim().toLowerCase();
  if (termo.length < 2) {
    alert("Digite ao menos 2 letras para buscar.");
    return;
  }
  // Aqui você pode rodar sua função de busca, abrir a lista de sugestões ou navegar pro produto
  console.log("Buscar por:", termo);
});

offcanvasSearchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    offcanvasSearchBtn.click();
  }
});
