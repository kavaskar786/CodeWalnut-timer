import { useState } from "react";
import { Clock, Plus } from "lucide-react";
import { TimerList } from "./components/timerList/TimerList";
import { TimerModal } from "./components/timerModal/TimerModal";
import { Button } from "./components/button/Button";
import { Toaster } from "sonner";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Timer App</h1>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="shadow-md hover:shadow-lg mt-2"
          >
            <Plus /> Add Timer
          </Button>
        </div>

        <TimerList />

        <TimerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mode="add"
        />
      </div>
    </div>
  );
}

export default Home;
