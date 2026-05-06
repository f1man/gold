'use client';

import { useState, useEffect } from 'react';
import styles from './Admin.module.css';

interface AdminClientProps {
  baseValue: any;
}

  type SettingVal = { type: string; value: number | string };
  type SettingsState = {
    pure_buy: SettingVal;
    pure_sell: SettingVal;
    k18_buy: SettingVal;
    k18_sell: SettingVal;
    k14_buy: SettingVal;
    k14_sell: SettingVal;
    plat_buy: SettingVal;
    plat_sell: SettingVal;
    silver_buy: SettingVal;
    silver_sell: SettingVal;
  };

  const defaultSettings: SettingsState = {
    pure_buy: { type: '+원', value: '' },
    pure_sell: { type: '+원', value: '' },
    k18_buy: { type: '+원', value: '' },
    k18_sell: { type: '+원', value: '' },
    k14_buy: { type: '+원', value: '' },
    k14_sell: { type: '+원', value: '' },
    plat_buy: { type: '+원', value: '' },
    plat_sell: { type: '+원', value: '' },
    silver_buy: { type: '+원', value: '' },
    silver_sell: { type: '+원', value: '' }
  };

  export default function AdminClient({ baseValue }: AdminClientProps) {
    const [settings, setSettings] = useState<SettingsState>(defaultSettings);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');

    useEffect(() => {
      fetch('/api/settings')
        .then(res => res.json())
        .then(data => {
          if (data.pure_buy && data.k18_buy) {
            // Convert 0 to empty string for better UX
            const formattedData = { ...data };
            Object.keys(formattedData).forEach(key => {
              if (formattedData[key].value === 0) {
                formattedData[key].value = '';
              }
            });
            setSettings(formattedData);
          }
        })
        .catch(console.error);
    }, []);

    const handleSettingChange = (category: keyof SettingsState, field: 'type' | 'value', val: any) => {
      setSettings(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [field]: val
        }
      }));
    };

    const handleSave = async () => {
      setIsSaving(true);
      setSaveMessage('');
      try {
        // Convert empty strings back to 0 before saving
        const payload = { ...settings };
        Object.keys(payload).forEach(key => {
          const k = key as keyof SettingsState;
          if (payload[k].value === '') {
            payload[k].value = 0;
          }
        });

        const res = await fetch('/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setSaveMessage('저장되었습니다.');
        } else {
          setSaveMessage('저장에 실패했습니다.');
        }
      } catch (e) {
        setSaveMessage('오류가 발생했습니다.');
      } finally {
        setIsSaving(false);
        setTimeout(() => setSaveMessage(''), 3000);
      }
    };

    const handleReset = async () => {
      setIsSaving(true);
      setSaveMessage('');
      try {
        const payload = { ...defaultSettings };
        Object.keys(payload).forEach(key => {
          const k = key as keyof SettingsState;
          if (payload[k].value === '') payload[k].value = 0;
        });

        const res = await fetch('/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setSettings(defaultSettings);
          setSaveMessage('원복되었습니다.');
        } else {
          setSaveMessage('원복에 실패했습니다.');
        }
      } catch (e) {
        setSaveMessage('오류가 발생했습니다.');
      } finally {
        setIsSaving(false);
        setTimeout(() => setSaveMessage(''), 3000);
      }
    };

    const calculatePreview = (original: number, setting: SettingVal) => {
      if (!original) return 0;
      let result = original;
      const { type, value } = setting;
      const numValue = Number(value) || 0;
      if (type === '+원') result = original + numValue;
      else if (type === '-원') result = original - numValue;
      else if (type === '+%') result = original + (original * (numValue / 100));
      else if (type === '-%') result = original - (original * (numValue / 100));
      return Math.round(result);
    };

    const renderSection = (title: string, category: keyof SettingsState, previewBaseKey: string, previewLabel: string) => {
      const setting = settings[category];
      const baseNum = baseValue ? baseValue[previewBaseKey] : 0;

      return (
        <div className={styles.section} key={category}>
          <h2 className={styles.sectionTitle}>{title}</h2>
          <div className={styles.flexRow} style={{ marginBottom: '1rem' }}>
            <select 
              className={styles.select} 
              value={setting.type} 
              onChange={(e) => handleSettingChange(category, 'type', e.target.value)}
            >
              <option value="+원">+원 (더하기)</option>
              <option value="-원">-원 (빼기)</option>
              <option value="+%">+% (비율 증가)</option>
              <option value="-%">-% (비율 감소)</option>
            </select>
            
            <input 
              type="number" 
              className={styles.input} 
              value={setting.value} 
              onChange={(e) => handleSettingChange(category, 'value', e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="보정할 숫자 입력"
            />
          </div>

        {baseNum ? (
          <div className={styles.previewGrid}>
            <div className={styles.previewBox}>
              <span className={styles.previewLabel}>{previewLabel} (원본)</span>
              <span className={styles.previewValue}>{baseNum.toLocaleString('ko-KR')}원</span>
            </div>
            
            <div className={styles.previewBox}>
              <span className={styles.previewLabel}>보정 후 미리보기</span>
              <span className={`${styles.previewValue} ${styles.corrected}`}>
                {calculatePreview(baseNum, setting).toLocaleString('ko-KR')}원
              </span>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>관리자 시세 보정</h1>
      
      <div className={styles.card}>
        <div className={styles.grid}>
          {renderSection('순금 살 때 보정', 'pure_buy', 's_pure', '순금 살 때')}
          {renderSection('순금 팔 때 보정', 'pure_sell', 'p_pure', '순금 팔 때')}
          
          {renderSection('18K 살 때 보정', 'k18_buy', 's_18k', '18K 살 때')}
          {renderSection('18K 팔 때 보정', 'k18_sell', 'p_18k', '18K 팔 때')}
          
          {renderSection('14K 살 때 보정', 'k14_buy', 's_14k', '14K 살 때')}
          {renderSection('14K 팔 때 보정', 'k14_sell', 'p_14k', '14K 팔 때')}

          {renderSection('백금 살 때 보정', 'plat_buy', 's_white', '백금 살 때')}
          {renderSection('백금 팔 때 보정', 'plat_sell', 'p_white', '백금 팔 때')}
          
          {renderSection('은 살 때 보정', 'silver_buy', 's_silver', '은 살 때')}
          {renderSection('은 팔 때 보정', 'silver_sell', 'p_silver', '은 팔 때')}
        </div>

        <div className={styles.section} style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--card-border)' }}>
          <div className={styles.flexRow} style={{ justifyContent: 'flex-end' }}>
            <button 
              className={`${styles.button} ${styles.buttonSecondary}`} 
              onClick={handleReset} 
              disabled={isSaving}
            >
              전체 원복 (초기화)
            </button>
            <button 
              className={styles.button} 
              onClick={handleSave} 
              disabled={isSaving}
            >
              {isSaving ? '저장 중...' : '전체 저장'}
            </button>
          </div>
          {saveMessage && <p style={{ marginTop: '1rem', textAlign: 'right', color: 'var(--primary)', fontWeight: 'bold' }}>{saveMessage}</p>}
        </div>

      </div>
    </div>
  );
}
