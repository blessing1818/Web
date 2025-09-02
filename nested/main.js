// Home 버튼 클릭 시 페이지 최상단으로 스크롤
document.addEventListener('DOMContentLoaded', () => {
  const homeBtn = document.querySelector('.header nav a[href="../nested/index.html"]');
  if (homeBtn) {
    homeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xfuchbhqrrwhkffiqidc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmdWNoYmhxcnJ3aGtmZmlxaWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3NzY1MzEsImV4cCI6MjA3MjM1MjUzMX0.rsNCWG7XW1FiZ_7nNce2iJoWcs4S1dmjQmfol5elpM8';
const supabase = createClient(supabaseUrl, supabaseKey);



function getDummyProducts() {
  // 첫 번째 셔츠, 두 번째 B.jpg 이미지
  // 9칸(3x3) 그리드, 첫 번째만 셔츠 이미지, 나머지는 빈 칸
  return [
    {
      name: 'T-Shirt',
      image: '../public/S.jpg',
      id: 1
    },
      {
        name: 'Orange Shirt',
        image: '../public/O.jpg',
        id: 2
      },
      {
        name: 'Yellow Shirt',
        image: '../public/Y.jpg',
        id: 3
      },
      {
        name: 'Blue Shirt',
        image: '../public/B.jpg',
        id: 4
      },
      {
        name: 'White Shirt',
        image: '../public/W.jpg',
        id: 5
      },
      {
        name: 'Bb Shirt',
        image: '../public/Bb.jpg',
        id: 6
      },
      {
        name: 'Red Shirt',
        image: '../public/R.jpg',
        id: 7
      },
      {
        name: 'Brown Shirt',
        image: '../public/Br.jpg',
        id: 8
      },
      { id: 9 }
  ];
}

function renderProducts(products) {
  const list = document.getElementById('product-list');
  list.innerHTML = '';
  list.style.display = 'grid';
  list.style.gridTemplateColumns = 'repeat(3, 1fr)';
  list.style.gap = '24px';
  list.style.maxHeight = '700px';
  list.style.overflowY = 'auto';
  list.style.overflowX = 'hidden';
  list.style.padding = '16px 0';

  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product-thumb';
    div.style.display = 'flex';
    div.style.justifyContent = 'center';
    div.style.alignItems = 'center';
    div.style.background = '#fff';
    div.style.borderRadius = '12px';
    div.style.boxShadow = '0 1px 8px #0001';
    div.style.height = '180px';
    div.style.cursor = 'pointer';
    if (product.image) {
      div.innerHTML = `<img src="${product.image}" alt="${product.name || ''}" />`;
      if (product.id === 1) {
        div.onclick = () => {
          window.location.href = '../index.html';
        };
      }
    } else if (product.id === 9) {
  div.innerHTML = '<span style="color:#888;font-size:1.2rem;font-weight:500;">Coming Soon</span>';
      div.style.background = '#f0f0f0';
      div.style.display = 'flex';
      div.style.justifyContent = 'center';
      div.style.alignItems = 'center';
      div.style.cursor = 'default';
    } else {
      div.innerHTML = '';
    }
    list.appendChild(div);
  });
}

// 더미 상품 24개로 그리드 렌더링
renderProducts(getDummyProducts());
