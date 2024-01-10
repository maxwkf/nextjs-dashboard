import { Inter, Lusitana } from 'next/font/google';

//https://fonts.google.com/knowledge/glossary/subsetting
export const inter = Inter({ subsets: ['latin'] });

export const lusitana = Lusitana({ weight: ['400', '700'], subsets: ['latin'] });