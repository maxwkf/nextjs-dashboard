import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import CardWrapper from '@/app/ui/dashboard/cards';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices, fetchCardData } from '@/app/lib/data';
import ListBoxDemo from '@/app/ui/dashboard/list-box-demo';
import { Suspense } from 'react';
import { RevenueChartSkeleton, InvoiceSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
 
export default async function Page() {
    const latestInvoices = await fetchLatestInvoices();
    const cardData = await fetchCardData();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* I used the card wrapper here and no need to uncomment the suggested code below */}
        
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" /> */}
        {/* <Card title="Pending" value={totalPendingInvoices} type="pending" /> */}
        {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
        {/* <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<InvoiceSkeleton />}>
          <LatestInvoices />
        </Suspense>

        {/*
        https://headlessui.com/react/listbox 
        Completely unstyled, fully accessible UI components, designed to integrate beautifully with Tailwind CSS.
        */}
        {/* This is an extra inclusion of headlessui */}
        {/* <ListBoxDemo /> */}
      </div>
    </main>
  );
}