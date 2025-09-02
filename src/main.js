


import './style.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';
import { createClient } from '@supabase/supabase-js';

// Supabase 연결 정보
const supabaseUrl = 'https://xfuchbhqrrwhkffiqidc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmdWNoYmhxcnJ3aGtmZmlxaWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3NzY1MzEsImV4cCI6MjA3MjM1MjUzMX0.rsNCWG7XW1FiZ_7nNce2iJoWcs4S1dmjQmfol5elpM8';
const supabase = createClient(supabaseUrl, supabaseKey);

// Supabase JS 클라이언트로 user_events 기록 함수
async function logUserEvent({ user_id, event_type, product_id, user_agent }) {
  const { data, error } = await supabase
    .from('user_events')
    .insert([
      {
        user_id,
        event_type,
        product_id,
        user_agent
      }
    ]);
  if (error) {
    console.error('이벤트 기록 오류:', error);
  } else {
    console.log('이벤트 기록 성공:', data);
  }
}

// 임시 user_id 생성 (실제 서비스에서는 로그인/세션 등으로 관리)
function getUserId() {
  let userId = localStorage.getItem('user_id');
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem('user_id', userId);
  }
  return userId;
}

// 상품 id (예시: 1)
const PRODUCT_ID = '1';

// user_agent 정보
const USER_AGENT = navigator.userAgent;

// Supabase에 user_events 테이블 생성 (관리자 권한 필요)
async function createUserEventsTable() {
  const sql = `
    create table if not exists user_events (
      id uuid primary key default gen_random_uuid(),
      user_id uuid,
      event_type text,
      product_id text,
      timestamp timestamptz default now(),
      user_agent text
    );
  `;
  const res = await fetch(`${supabaseUrl}/rest/v1/rpc/execute_sql`, {
    method: 'POST',
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql })
  });
  const result = await res.json();
  console.log('user_events 테이블 생성 결과:', result);
}

// 사용 예시: createUserEventsTable();

document.addEventListener('DOMContentLoaded', () => {
  // 활동 내역 관리
  const activityTable = document.getElementById('activityTable').querySelector('tbody');
  const activities = [];

  function addActivity(type) {
    const now = new Date();
    const time = now.toISOString().replace('T', ' ').substring(0, 19);
    activities.push({ type, time });
    renderActivities();
  }

  function renderActivities() {
    activityTable.innerHTML = '';
    activities.forEach(act => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${act.type}</td><td>${act.time}</td>`;
      activityTable.appendChild(tr);
    });
  }

  // 버튼 이벤트
  document.getElementById('addCartBtn').addEventListener('click', () => {
    addActivity('add_to_cart');
    logUserEvent({
      user_id: getUserId(),
      event_type: 'add_to_cart',
      product_id: PRODUCT_ID,
      user_agent: USER_AGENT
    });
  });
  document.getElementById('purchaseBtn').addEventListener('click', () => {
    addActivity('purchase');
    logUserEvent({
      user_id: getUserId(),
      event_type: 'purchase',
      product_id: PRODUCT_ID,
      user_agent: USER_AGENT
    });
  });

  // 첫 페이지 진입 시 page_view 기록
  addActivity('page_view');
  logUserEvent({
    user_id: getUserId(),
    event_type: 'page_view',
    product_id: PRODUCT_ID,
    user_agent: USER_AGENT
  });

  // Supabase에 user_events 테이블 자동 생성
  createUserEventsTable();
});
