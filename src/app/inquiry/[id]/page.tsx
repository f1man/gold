'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

export default function InquiryDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [id, setId] = useState<string>('');
  const [inquiry, setInquiry] = useState<any>(null);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    params.then(p => setId(p.id));
  }, [params]);

  useEffect(() => {
    if (!id) return;
    
    // Check session storage for verified data
    const storedData = sessionStorage.getItem(`inquiry_${id}`);
    if (storedData) {
      setInquiry(JSON.parse(storedData));
    } else {
      // If no verified data, redirect back to list
      alert('비정상적인 접근이거나 세션이 만료되었습니다.');
      router.replace('/inquiry');
    }
  }, [id, router]);

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/inquiries/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, reply: replyText })
      });
      const data = await res.json();
      if (data.success) {
        // Update local state
        const updatedInquiry = { 
          ...inquiry, 
          reply: replyText, 
          replyCreatedAt: new Date().toISOString() 
        };
        setInquiry(updatedInquiry);
        sessionStorage.setItem(`inquiry_${id}`, JSON.stringify(updatedInquiry));
        setReplyText('');
      }
    } catch (err) {
      alert('답변 등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  if (!inquiry) return <div className={styles.container}>로딩 중...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>[{inquiry.inquiryType}] {inquiry.title}</h1>
        <div className={styles.meta}>
          <span><strong>작성자</strong> {inquiry.author}</span>
          <span><strong>연락처</strong> {inquiry.contact}</span>
          <span><strong>작성일</strong> {formatDate(inquiry.createdAt)}</span>
        </div>
      </div>

      <div className={styles.content}>
        {inquiry.content}
      </div>

      {inquiry.reply ? (
        <div className={styles.replySection}>
          <div className={styles.replyHeader}>
            <span className={styles.replyTitle}>관리자 답변</span>
            <span className={styles.replyDate}>{formatDate(inquiry.replyCreatedAt)}</span>
          </div>
          <div className={styles.replyContent}>
            {inquiry.reply}
          </div>
        </div>
      ) : (
        <form className={styles.replyForm} onSubmit={handleReplySubmit}>
          <h3>답변 등록 (관리자용 데모 기능)</h3>
          <textarea
            className={styles.textarea}
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            placeholder="답변 내용을 입력하세요..."
          />
          <div style={{ textAlign: 'right' }}>
            <button type="submit" className={styles.submitBtn} disabled={isSubmitting || !replyText}>
              {isSubmitting ? '등록 중...' : '답변 등록'}
            </button>
          </div>
        </form>
      )}

      <div className={styles.actions}>
        <Link href="/inquiry" className={`${styles.btn} ${styles.backBtn}`}>목록으로</Link>
      </div>
    </div>
  );
}
