'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

export default function WriteInquiry() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    password: '',
    contact: '',
    inquiryType: '커플링',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.password || !formData.contact || !formData.content) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        alert('문의가 성공적으로 등록되었습니다.');
        router.push('/inquiry');
      } else {
        alert('등록에 실패했습니다.');
      }
    } catch (err) {
      alert('오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>문의하기</h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="author">작성자</label>
            <input 
              type="text" 
              id="author" 
              name="author" 
              className={styles.input} 
              value={formData.author}
              onChange={handleChange}
              placeholder="이름을 입력하세요"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">비밀번호</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className={styles.input}
              value={formData.password}
              onChange={handleChange}
              placeholder="글을 확인할 때 필요합니다"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label htmlFor="contact">연락처</label>
            <input 
              type="text" 
              inputMode="numeric"
              pattern="[0-9\-]*"
              id="contact" 
              name="contact" 
              className={styles.input}
              value={formData.contact}
              onChange={handleChange}
              placeholder="010-0000-0000"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="inquiryType">상담 유형</label>
            <select 
              id="inquiryType" 
              name="inquiryType" 
              className={styles.select}
              value={formData.inquiryType}
              onChange={handleChange as any}
            >
              <option value="커플링">커플링</option>
              <option value="다이아몬드링">다이아몬드링</option>
              <option value="목걸이">목걸이</option>
              <option value="귀걸이">귀걸이</option>
              <option value="팔찌">팔찌</option>
              <option value="기타">기타</option>
            </select>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="title">제목</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            className={styles.input}
            value={formData.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="content">상담 내용</label>
          <textarea 
            id="content" 
            name="content" 
            className={styles.textarea}
            value={formData.content}
            onChange={handleChange}
            placeholder="상담을 원하시는 내용을 자세히 적어주세요."
          />
        </div>

        <div className={styles.actions}>
          <Link href="/inquiry" className={styles.cancelBtn}>취소</Link>
          <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? '등록 중...' : '등록하기'}
          </button>
        </div>
      </form>
    </div>
  );
}
