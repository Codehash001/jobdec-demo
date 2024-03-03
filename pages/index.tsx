import { useRef, useState, useEffect } from 'react';
import Layout from '@/components/layout';
import styles from '@/styles/Home.module.css';
import { Message } from '@/types/chat';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import LoadingDots from '@/components/ui/LoadingDots';
import { Document } from 'langchain/document';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Select from '@/components/selectFiles';
import Chat from '@/components/chat';

export default function Home() {

  return (
    <>
    <div className='w-screen h-screen overflow-hidden px-10 py-6 flex custom-scrollbar'>
      <div className='w-full px-10 py-5'>
      <h1 className='font-medium text-xl mb-5'>Resume Chatbot</h1>
        <Select/></div>
      <div className='w-full px-10 py-5'><Chat/></div>
        </div>
    </>
  );
}
