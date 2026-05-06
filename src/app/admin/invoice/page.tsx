'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

interface DiamondSpec {
  id: number;
  size: string;
  qty: number;
}

export default function InvoicePage() {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [staffName, setStaffName] = useState('김정 (보석감정사)');
  const [staffPhone, setStaffPhone] = useState('010-2306-7774');
  const [productName, setProductName] = useState('5부 테니스 팔찌');
  const [material, setMaterial] = useState('순금');
  const [color, setColor] = useState('YG');
  const [diamonds, setDiamonds] = useState<DiamondSpec[]>([]);
  const [receiptNum, setReceiptNum] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Generate receipt number on client mount
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    const dateStr = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
    const rand = Math.floor(1000 + Math.random() * 9000);
    setReceiptNum(`JS-${dateStr}-${rand}`);
    setCurrentDate(`${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 8) v = v.slice(0, 8);
    if (v.length > 4) v = v.slice(0, 4) + '-' + v.slice(4);
    setter(v);
  };

  const addDiamond = () => {
    setDiamonds([...diamonds, { id: Date.now(), size: '1부', qty: 1 }]);
  };

  const removeDiamond = (id: number) => {
    setDiamonds(diamonds.filter(d => d.id !== id));
  };

  const updateDiamond = (id: number, field: keyof DiamondSpec, value: any) => {
    setDiamonds(diamonds.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const sizeOptions = ['1부', '2부', '3부', '5부', '7부', '1캐럿', '2캐럿', '3캐럿'];

  return (
    <div className={styles.wrapper}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <span className={styles.brand}>JASMINE JEWELRY — ATELIER</span>
        <h1>영수증 발행 시스템</h1>
        <p className={styles.subtitle}>RECEIPT ISSUANCE SYSTEM</p>
        <div className={styles.titleRule}>
          <span></span><i>♦</i><span></span>
        </div>
      </div>

      <div className={styles.layout}>
        {/* ── LEFT: FORM ── */}
        <div className={`${styles.formCol} ${styles.panel}`}>
          <p className={styles.panelTitle}>고객 정보 입력</p>

          <div className={styles.row2}>
            <div className={styles.formGroup}>
              <label>고객 성함 <span className={styles.req}>*</span></label>
              <input 
                type="text" 
                className={styles.input}
                value={clientName} 
                onChange={e => setClientName(e.target.value)} 
                placeholder="홍길동" 
              />
            </div>
            <div className={styles.formGroup}>
              <label>연락처 <span className={styles.req}>*</span></label>
              <div className={styles.phoneRow}>
                <div className={styles.phonePrefix}>010</div>
                <input 
                  type="tel" 
                  className={styles.input}
                  value={clientPhone} 
                  onChange={e => handlePhoneChange(e, setClientPhone)} 
                  placeholder="0000-0000" 
                />
              </div>
            </div>
          </div>

          <div className={styles.formDivider}></div>
          <p className={styles.panelTitle}>담당자 정보</p>

          <div className={styles.row2}>
            <div className={styles.formGroup}>
              <label>담당자</label>
              <input 
                type="text" 
                className={styles.input}
                value={staffName} 
                onChange={e => setStaffName(e.target.value)} 
              />
            </div>
            <div className={styles.formGroup}>
              <label>담당자 연락처</label>
              <input 
                type="text" 
                className={styles.input}
                value={staffPhone} 
                onChange={e => setStaffPhone(e.target.value)} 
              />
            </div>
          </div>

          <div className={styles.formDivider}></div>
          <p className={styles.panelTitle}>제품 정보</p>

          <div className={styles.formGroup}>
            <label>제품명 <span className={styles.req}>*</span></label>
            <input 
              type="text" 
              className={styles.input}
              value={productName} 
              onChange={e => setProductName(e.target.value)} 
            />
          </div>

          <div className={styles.row2}>
            <div className={styles.formGroup}>
              <label>재원</label>
              <div className={styles.btnGroup}>
                {['순금', '14K', '18K'].map(m => (
                  <button 
                    key={m}
                    className={`${styles.btnToggle} ${material === m ? styles.active : ''}`}
                    onClick={() => setMaterial(m)}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>컬러</label>
              <div className={styles.btnGroup}>
                {['YG', 'WG', 'RG'].map(c => (
                  <button 
                    key={c}
                    className={`${styles.btnToggle} ${color === c ? styles.active : ''}`}
                    onClick={() => setColor(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.formDivider}></div>

          {/* Diamond */}
          <div className={styles.diamondHeader}>
            <label>다이아 스펙</label>
            <button className={styles.btnAdd} onClick={addDiamond}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
              항목 추가
            </button>
          </div>

          <div className={styles.diamondList}>
            {diamonds.map(d => (
              <div key={d.id} className={styles.diamondRow}>
                <select 
                  value={d.size} 
                  onChange={e => updateDiamond(d.id, 'size', e.target.value)}
                >
                  {sizeOptions.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <input 
                  type="number" 
                  className={`${styles.input} ${styles.qtyInput}`} 
                  min="1" 
                  max="999" 
                  value={d.qty}
                  onChange={e => updateDiamond(d.id, 'qty', Number(e.target.value))} 
                  placeholder="수량" 
                />
                <button className={styles.btnDel} onClick={() => removeDiamond(d.id)}>×</button>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: RECEIPT ── */}
        <div className={styles.receiptPanel}>

          {/* Banner */}
          <div className={styles.receiptTopBanner}>
            <div className={styles.receiptBrand}>Jasmine Jewelry</div>
            <span className={styles.receiptBrandSub}>PRIVATE ATELIER · BESPOKE CRAFT</span>
          </div>

          <div className={styles.receipt}>
            {/* Stamp */}
            <div className={styles.receiptStamp}>JASMINE<br/>JEWELRY<br/>CERTIFIED</div>

            {/* Meta */}
            <div className={styles.receiptMeta}>
              <div className={styles.receiptMetaLeft}>
                <div className={styles.receiptNum}>{receiptNum}</div>
                <div>발행일 : {currentDate}</div>
              </div>
              <div className={styles.receiptMetaRight}>
                담당자 : <strong>{staffName || '—'}</strong><br/>
                연락처 : <span>{staffPhone || '—'}</span>
              </div>
            </div>

            <div className={styles.receiptRule}></div>

            {/* Client Info */}
            <div className={styles.rSectionLabel}>CLIENT INFORMATION</div>
            <div className={styles.rRow}>
              <span className={styles.rLabel}>고객 성함</span>
              <span className={`${styles.rVal} ${!clientName ? styles.empty : ''}`}>{clientName || '—'}</span>
            </div>
            <div className={styles.rRow}>
              <span className={styles.rLabel}>연락처</span>
              <span className={`${styles.rVal} ${!clientPhone ? styles.empty : ''}`}>{clientPhone ? `010-${clientPhone}` : '—'}</span>
            </div>

            <hr className={styles.receiptRuleDashed} />

            {/* Product Info */}
            <div className={styles.rSectionLabel}>PRODUCT DETAILS</div>
            <div className={styles.rRow}>
              <span className={styles.rLabel}>제품명</span>
              <span className={`${styles.rVal} ${!productName ? styles.empty : ''}`}>{productName || '—'}</span>
            </div>
            <div className={styles.rRow}>
              <span className={styles.rLabel}>재원 / 컬러</span>
              <span className={styles.rVal}>
                <span className={`${styles.badge} ${styles.badgeMaterial}`}>{material}</span>
                <span className={styles.badge} style={{ marginLeft: '4px' }}>{color}</span>
              </span>
            </div>

            <hr className={styles.receiptRuleDashed} />

            {/* Diamond Table */}
            <div className={styles.rSectionLabel}>DIAMOND SPECIFICATION</div>
            <table className={styles.diamondTable}>
              <thead>
                <tr>
                  <th>캐럿 / 사이즈</th>
                  <th>수량</th>
                </tr>
              </thead>
              <tbody>
                {diamonds.length === 0 ? (
                  <tr className={styles.noData}><td colSpan={2}>다이아 스펙을 추가해 주세요</td></tr>
                ) : (
                  diamonds.map(d => (
                    <tr key={d.id}>
                      <td>◆ &nbsp;{d.size}</td>
                      <td>{d.qty || 1} 개</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* A/S Box */}
            <div className={styles.asBox}>
              <div className={styles.asTitle}>평생 A/S 보증</div>
              <div className={styles.asText}>
                본 제품은 <strong>자스민주얼리 평생 A/S</strong>가 적용됩니다.<br/>
                구매 후 세척·광택·사이즈 조정은 <strong>무상</strong>으로 제공되며,<br/>
                석(石) 분실 및 파손은 <strong>원가 보증 수리</strong>로 진행됩니다.<br/>
                본 영수증을 지참하시면 전국 모든 자스민주얼리 매장에서 서비스 받으실 수 있습니다.
              </div>
            </div>

            {/* Store Info */}
            <div className={styles.storeInfo}>
              <div className={styles.storeNameBlock}>
                <div className={styles.storeGem}>◆</div>
                <div>
                  <h3 className={styles.storeName}>Jasmine Jewelry</h3>
                  <div style={{ fontSize: '0.75rem', color: '#C4A0AC' }}>자스민주얼리 아틀리에</div>
                </div>
              </div>
              <div className={styles.storeDetail}>
                서울특별시 강남구 청담동 14-8<br/>
                자스민주얼리 빌딩 2F<br/>
                Tel. 02-545-7774
              </div>
            </div>

            {/* Signature */}
            <div className={styles.sigRow}>
              <span className={styles.sigLabel}>담당 보석감정사</span>
              <div className={styles.sigLine}></div>
              <span className={styles.sigName}>{(staffName.split('(')[0]).trim() || '—'}</span>
            </div>

          </div>

          {/* Print button */}
          <div className={styles.printArea}>
            <button className={styles.btnPrint} onClick={() => window.print()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              영수증 인쇄
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
