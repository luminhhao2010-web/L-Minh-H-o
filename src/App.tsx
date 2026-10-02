import React, { useState, useEffect } from 'react';
import { StudentProfile, GradeLevel } from './types';
import { STUDENT_TITLES, QUIZ_QUESTIONS, STATIONS } from './data/quizData';
import { MAP_MARKERS } from './data/mapData';
import { FLOWCHART_STEPS } from './data/flowchartData';
import { Header } from './components/Header';
import { TabMap } from './components/TabMap';
import { TabQuizGame } from './components/TabQuizGame';
import { TabFlowchart } from './components/TabFlowchart';
import { TabPeaceCooperation } from './components/TabPeaceCooperation';
import { TabChatbot } from './components/TabChatbot';
import { FloatingChatbot } from './components/FloatingChatbot';
import { StudentProfileModal } from './components/StudentProfileModal';
import { CongratulationsModal } from './components/CongratulationsModal';
import { playFanfareSound, playFireworksSound } from './utils/audio';
import { triggerFireworksConfetti } from './utils/confetti';

const STORAGE_KEY = 'BIEN_DONG_GEO11_STUDENT_PROFILE';

const DEFAULT_PROFILE: StudentProfile = {
  name: 'Lư Minh Hảo',
  school: 'Trường THPT Chuyên',
  className: '11 Chuyên Địa',
  gradeLevel: 'thpt',
  coins: 30, // Khởi đầu tặng 30 Xu khích lệ
  title: 'Thủy thủ Tập sự',
  progress: 10,
  answeredQuestions: {},
  completedStations: [],
  visitedMarkers: [],
  readFlowchartSteps: []
};

export default function App() {
  // Load initial profile from localStorage
  const [profile, setProfile] = useState<StudentProfile>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.name === 'Nguyễn Minh Quân' || !parsed.name) {
            parsed.name = 'Lư Minh Hảo';
          }
          return { ...DEFAULT_PROFILE, ...parsed };
        }
      } catch (e) {
        console.warn('Cannot read localStorage', e);
      }
    }
    return DEFAULT_PROFILE;
  });

  const [activeTab, setActiveTab] = useState<'map' | 'quiz' | 'flowchart' | 'cooperation' | 'chat'>('cooperation');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [initialBotQuery, setInitialBotQuery] = useState<string>('');
  
  // Congratulations modal state
  const [congratsData, setCongratsData] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    earnedCoins?: number;
    newTitle?: string;
  }>({
    isOpen: false,
    title: '',
    message: ''
  });

  // Save profile to localStorage whenever changed
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('Cannot write localStorage', e);
    }
  }, [profile]);

  // Recalculate progress and Title rank
  const calculateProgressAndTitle = (
    answered: Record<string, boolean>,
    visited: string[],
    readSteps: string[],
    currentCoins: number
  ) => {
    const totalPossiblePoints = QUIZ_QUESTIONS.length + MAP_MARKERS.length + FLOWCHART_STEPS.length;
    const correctCount = Object.values(answered).filter(Boolean).length;
    const currentPoints = correctCount + visited.length + readSteps.length;

    const progressPct = Math.min(100, Math.round((currentPoints / totalPossiblePoints) * 100));

    // Determine Title rank
    let matchedTitle = STUDENT_TITLES[0].title;
    for (let i = STUDENT_TITLES.length - 1; i >= 0; i--) {
      if (currentCoins >= STUDENT_TITLES[i].requiredCoins && progressPct >= STUDENT_TITLES[i].requiredProgress) {
        matchedTitle = STUDENT_TITLES[i].title;
        break;
      }
    }

    return { progressPct, matchedTitle };
  };

  // Reward Coins for Quiz question (+10 Xu)
  const handleRewardCoins = (amount: number, questionId: string) => {
    setProfile(prev => {
      const nextCoins = prev.coins + amount;
      const nextAnswered = { ...prev.answeredQuestions, [questionId]: true };
      const { progressPct, matchedTitle } = calculateProgressAndTitle(
        nextAnswered,
        prev.visitedMarkers,
        prev.readFlowchartSteps,
        nextCoins
      );

      // Check if title upgraded!
      if (matchedTitle !== prev.title) {
        setTimeout(() => {
          playFireworksSound();
          triggerFireworksConfetti();
          setCongratsData({
            isOpen: true,
            title: 'THĂNG CẤP DANH HIỆU MỚI! 🏆',
            message: `Chúc mừng bạn đã xuất sắc tích lũy điểm và thăng cấp lên danh hiệu "${matchedTitle}". Hãy tiếp tục vươn xa và chinh phục Biển Đông nhé!`,
            earnedCoins: amount,
            newTitle: matchedTitle
          });
        }, 600);
      }

      return {
        ...prev,
        coins: nextCoins,
        answeredQuestions: nextAnswered,
        progress: progressPct,
        title: matchedTitle
      };
    });
  };

  // Station completion bonus (Hoàn thành một chặng đường hải trình)
  const handleCompleteStation = (stationId: number) => {
    setProfile(prev => {
      if (prev.completedStations.includes(stationId)) return prev;
      const nextStations = [...prev.completedStations, stationId];
      const bonusCoins = 20;
      const nextCoins = prev.coins + bonusCoins;
      const currentStationObj = STATIONS.find(s => s.id === stationId);

      setTimeout(() => {
        playFireworksSound();
        triggerFireworksConfetti();
        setCongratsData({
          isOpen: true,
          title: `HOÀN THÀNH CHẶNG ĐƯỜNG: ${currentStationObj?.lighthouseName.toUpperCase()}! 🚢`,
          message: `Chúc mừng bạn đã hoàn thành xuất sắc chặng đường và cập bến thành công ngọn hải đăng ${currentStationObj?.lighthouseName} (${currentStationObj?.location}). Bạn được thưởng thêm +${bonusCoins} Xu!`,
          earnedCoins: bonusCoins
        });
      }, 400);

      const { progressPct, matchedTitle } = calculateProgressAndTitle(
        prev.answeredQuestions,
        prev.visitedMarkers,
        prev.readFlowchartSteps,
        nextCoins
      );

      // Also check if station completion triggers a title upgrade
      if (matchedTitle !== prev.title) {
        setTimeout(() => {
          playFireworksSound();
          triggerFireworksConfetti();
          setCongratsData({
            isOpen: true,
            title: 'THĂNG CẤP DANH HIỆU MỚI! 🏆',
            message: `Chúc mừng bạn đã hoàn thành chặng đường và thăng cấp danh hiệu lên "${matchedTitle}"!`,
            earnedCoins: bonusCoins,
            newTitle: matchedTitle
          });
        }, 1200);
      }

      return {
        ...prev,
        completedStations: nextStations,
        coins: nextCoins,
        progress: progressPct,
        title: matchedTitle
      };
    });
  };

  // Visit Map Marker (+5 Xu)
  const handleVisitMarker = (markerId: string) => {
    setProfile(prev => {
      if (prev.visitedMarkers.includes(markerId)) return prev;
      const nextVisited = [...prev.visitedMarkers, markerId];
      const nextCoins = prev.coins + 5;

      const { progressPct, matchedTitle } = calculateProgressAndTitle(
        prev.answeredQuestions,
        nextVisited,
        prev.readFlowchartSteps,
        nextCoins
      );

      if (matchedTitle !== prev.title) {
        setTimeout(() => {
          playFireworksSound();
          triggerFireworksConfetti();
          setCongratsData({
            isOpen: true,
            title: 'THĂNG CẤP DANH HIỆU MỚI! 🏆',
            message: `Chúc mừng bạn đã khám phá hải đồ và thăng cấp lên danh hiệu "${matchedTitle}"!`,
            earnedCoins: 5,
            newTitle: matchedTitle
          });
        }, 600);
      }

      return {
        ...prev,
        visitedMarkers: nextVisited,
        coins: nextCoins,
        progress: progressPct,
        title: matchedTitle
      };
    });
  };

  // Read Flowchart Step (+5 Xu)
  const handleReadStep = (stepId: string) => {
    setProfile(prev => {
      if (prev.readFlowchartSteps.includes(stepId)) return prev;
      const nextRead = [...prev.readFlowchartSteps, stepId];
      const nextCoins = prev.coins + 5;

      const { progressPct, matchedTitle } = calculateProgressAndTitle(
        prev.answeredQuestions,
        prev.visitedMarkers,
        nextRead,
        nextCoins
      );

      if (matchedTitle !== prev.title) {
        setTimeout(() => {
          playFireworksSound();
          triggerFireworksConfetti();
          setCongratsData({
            isOpen: true,
            title: 'THĂNG CẤP DANH HIỆU MỚI! 🏆',
            message: `Chúc mừng bạn đã học sơ đồ và thăng cấp lên danh hiệu "${matchedTitle}"!`,
            earnedCoins: 5,
            newTitle: matchedTitle
          });
        }, 600);
      }

      return {
        ...prev,
        readFlowchartSteps: nextRead,
        coins: nextCoins,
        progress: progressPct,
        title: matchedTitle
      };
    });
  };

  // Update profile attributes from modal
  const handleSaveProfile = (updated: Partial<StudentProfile>) => {
    setProfile(prev => ({
      ...prev,
      ...updated
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A2540] text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      {/* Header Bar with personalized student stats */}
      <Header
        profile={profile}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col">
        {activeTab === 'cooperation' && (
          <TabPeaceCooperation
            onAskAI={(question) => {
              setInitialBotQuery(question);
              setActiveTab('chat');
            }}
          />
        )}

        {activeTab === 'map' && (
          <TabMap
            visitedMarkers={profile.visitedMarkers}
            onVisitMarker={handleVisitMarker}
            onRewardCoins={handleRewardCoins}
          />
        )}

        {activeTab === 'quiz' && (
          <TabQuizGame
            profile={profile}
            onRewardCoins={handleRewardCoins}
            onCompleteStation={handleCompleteStation}
          />
        )}

        {activeTab === 'flowchart' && (
          <TabFlowchart
            readSteps={profile.readFlowchartSteps}
            onReadStep={handleReadStep}
          />
        )}

        {activeTab === 'chat' && (
          <TabChatbot initialQuery={initialBotQuery} />
        )}
      </main>

      {/* Floating Chatbot Widget (available everywhere except when already on chat tab) */}
      {activeTab !== 'chat' && (
        <FloatingChatbot onOpenFullTab={() => setActiveTab('chat')} />
      )}

      {/* Student Profile Personalization Modal */}
      <StudentProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />

      {/* Congratulations / Reward Modal */}
      <CongratulationsModal
        isOpen={congratsData.isOpen}
        onClose={() => setCongratsData(prev => ({ ...prev, isOpen: false }))}
        titleText={congratsData.title}
        message={congratsData.message}
        earnedCoins={congratsData.earnedCoins}
        newTitle={congratsData.newTitle}
      />

      {/* Professional Educational Footer */}
      <footer className="bg-[#061828] border-t border-cyan-500/20 py-4 px-4 sm:px-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">🇻🇳</span>
            <span className="font-bold text-slate-300">
              Quần đảo Hoàng Sa (TP. Đà Nẵng) & Quần đảo Trường Sa (Tỉnh Khánh Hòa) là một phần máu thịt thiêng liêng của Tổ quốc Việt Nam.
            </span>
          </div>
          <div className="flex flex-col md:items-end gap-1 text-[11px]">
            <div className="text-slate-500">
              Nội dung chuẩn hóa theo SGK Chuyên đề Địa lí 11 (Bộ sách Kết nối tri thức với cuộc sống - NXB Giáo dục Việt Nam)
            </div>
            <div className="text-cyan-300/90 font-medium">
              (địa chỉ trường: 61C, Xã Vị Thủy, TP Cần Thơ)
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
