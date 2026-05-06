'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import styles from './page.module.css';

interface InquiryListItem {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  hasReply: boolean;
}

export default function InquiryList() {
  const [inquiries, setInquiries] = useState<InquiryListItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const router = useRouter();

  useEffect(() => {
    fetch('/api/inquiries')
      .then(res => res.json())
      .then(data => {
        setInquiries(data);
        setLoading(false);
      });
  }, []);

  const handleRowClick = (id: string) => {
    setSelectedId(id);
    setPassword('');
    setError('');
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('비밀번호를 입력해주세요.');
      return;
    }

    try {
      const res = await fetch('/api/inquiries/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedId, password })
      });

      const data = await res.json();
      if (data.success) {
        // Successful verification. In a real app we'd use a session or passing state.
        // For this demo, we'll store the verified data in sessionStorage to show in the next page
        sessionStorage.setItem(`inquiry_${selectedId}`, JSON.stringify(data.inquiry));
        router.push(`/inquiry/${selectedId}`);
      } else {
        setError('비밀번호가 일치하지 않습니다.');
      }
    } catch (err) {
      setError('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>1:1 상담문의</h1>
          <p className={styles.subtitle}>고객님의 소중한 문의를 프라이빗하게 남겨주세요.</p>
        </div>
        <Link href="/inquiry/write" className={styles.writeBtn}>문의하기</Link>
      </div>

      {loading ? (
        <div className={styles.empty}>로딩 중...</div>
      ) : inquiries.length === 0 ? (
        <div className={styles.empty}>등록된 문의글이 없습니다. 첫 문의를 남겨주세요.</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '10%' }}>상태</th>
              <th style={{ width: '50%' }}>제목</th>
              <th style={{ width: '20%' }}>작성자</th>
              <th style={{ width: '20%' }}>작성일</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id} className={styles.row} onClick={() => handleRowClick(inquiry.id)}>
                <td>
                  <span className={`${styles.status} ${inquiry.hasReply ? styles.statusComplete : styles.statusPending}`}>
                    {inquiry.hasReply ? '답변완료' : '답변대기'}
                  </span>
                </td>
                <td>
                  <Lock className={styles.lockIcon} />
                  {inquiry.title}
                </td>
                <td>{inquiry.author.substring(0, 1)}**</td>
                <td>{formatDate(inquiry.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Password Modal */}
      {selectedId && (
        <div className={styles.modalOverlay} onClick={() => setSelectedId(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>비밀번호 확인</h2>
            <form onSubmit={handleVerify}>
              <div className={styles.inputGroup}>
                <label>이 글을 볼 수 있는 비밀번호를 입력하세요.</label>
                <input 
                  type="password" 
                  className={styles.input}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoFocus
                />
                {error && <div className={styles.error}>{error}</div>}
              </div>
              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setSelectedId(null)}>취소</button>
                <button type="submit" className={styles.submitBtn}>확인</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
