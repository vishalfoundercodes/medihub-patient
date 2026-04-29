import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';
import AccountSidebar from '../components/account/AccountSidebar';
import LabDetailHero from '../components/labdetail/LabDetailHero';
import LabDetailTabs from '../components/labdetail/LabDetailTabs';
import LabDetailOverview from '../components/labdetail/LabDetailOverview';
import LabDetailPreparation from '../components/labdetail/LabDetailPreparation';
import LabDetailFAQs from '../components/labdetail/LabDetailFAQs';
import BookingSummary from '../components/labdetail/BookingSummary';
import SampleCollection from '../components/labdetail/SampleCollection';
import WhyChooseUs from '../components/labdetail/WhyChooseUs';
import NeedHelp from '../components/labdetail/NeedHelp';
import { useAuth } from '../context/AuthContext';
import { LAB_TEST_DETAIL } from '../data/labTestDetailData';

export default function LabTestDetail() {
  const { user, setShowLogin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const test = LAB_TEST_DETAIL;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview': return <LabDetailOverview test={test} />;
      case 'Tests Included': return (
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6">
          <h3 className="font-bold text-[var(--color-text-dark)] mb-5">All Tests Included</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {test.testCategories.map((cat) => (
              <div key={cat.name}>
                <h4 className="font-bold text-sm text-[var(--color-text-dark)] mb-2">
                  {cat.name} <span className="text-[var(--color-text-secondary)] font-normal">({cat.count})</span>
                </h4>
                <ul className="space-y-1">
                  {cat.tests.map((t) => (
                    <li key={t} className="flex items-start gap-2 text-xs text-[var(--color-text-secondary)]">
                      <span className="text-[var(--color-success)] font-bold mt-0.5">✓</span> {t}
                    </li>
                  ))}
                  {cat.more > 0 && <li className="text-xs font-semibold text-[var(--color-primary)] mt-1">+ {cat.more} more</li>}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );
      case 'Preparation': return <LabDetailPreparation steps={test.preparation} />;
      case 'How it Works': return <LabDetailOverview test={{ ...test, testCategories: [], similarTests: [] }} />;
      case 'FAQs': return <LabDetailFAQs faqs={test.faqs} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)]">
      <Navbar />
      <Container className="py-8">
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="lg:hidden mb-4 flex items-center gap-2 border border-[var(--color-border)] px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--color-text-dark)] bg-white"
        >
          ☰ Account Menu
        </button>

        <div className="flex gap-7 items-start">
          {/* Sidebar */}
          <div className={`${mobileSidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 shrink-0`}>
            <AccountSidebar
              active="labtests"
              onChange={(id) => {
                setMobileSidebarOpen(false);
                if (id === 'account') navigate('/account');
                else if (id === 'orders') navigate('/orders');
                else if (id === 'labtests') navigate('/my-lab-tests');
              }}
            />
          </div>

          {/* Main 2-col layout */}
          <div className="flex-1 min-w-0">
            <div className="grid xl:grid-cols-3 gap-6">
              {/* Left — main content */}
              <div className="xl:col-span-2 space-y-5">
                <LabDetailHero test={test} />
                <LabDetailTabs active={activeTab} onChange={setActiveTab} />
                {renderTabContent()}
              </div>

              {/* Right — sidebar */}
              <div className="space-y-5">
                <BookingSummary booking={test.booking} />
                <SampleCollection data={test.sampleCollection} />
                <WhyChooseUs items={test.whyChooseUs} />
                <NeedHelp />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
