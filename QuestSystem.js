class QuestSystem {
    constructor(user) {
        this.user = user;
        this.activeQuests = [];
        this.completedQuests = [];
    }

    /**
     * 맞춤형 퀘스트 생성
     * @param {Object} userStatus - 유저의 현재 상태 데이터
     * @returns {Object} 생성된 퀘스트
     */
    generateQuest(userStatus) {
        const questPool = [
            { id: 1, title: "오늘 5,000보 걷기", type: "운동", reward: 10, condition: userStatus.steps < 5000 },
            { id: 2, title: "30분 독서하기", type: "학습", reward: 15, condition: userStatus.readingTime < 30 },
            { id: 3, title: "명상 10분 하기", type: "마음챙김", reward: 20, condition: userStatus.meditationTime < 10 }
        ];

        const availableQuests = questPool.filter(q => q.condition);
        if (availableQuests.length > 0) {
            const selectedQuest = availableQuests[Math.floor(Math.random() * availableQuests.length)];
            this.activeQuests.push(selectedQuest);
            return selectedQuest;
        } else {
            return { message: "오늘 수행할 퀘스트가 없습니다." };
        }
    }

    /**
     * 퀘스트 진행 상태 업데이트
     * @param {number} questId - 완료할 퀘스트 ID
     * @returns {Object} 업데이트 결과
     */
    completeQuest(questId) {
        const questIndex = this.activeQuests.findIndex(q => q.id === questId);
        if (questIndex !== -1) {
            const completedQuest = this.activeQuests.splice(questIndex, 1)[0];
            this.completedQuests.push(completedQuest);
            this.user.points += completedQuest.reward;
            return { message: `${completedQuest.title} 완료! 보상: ${completedQuest.reward} 포인트` };
        } else {
            return { message: "해당 퀘스트를 찾을 수 없습니다." };
        }
    }

    /**
     * 유저의 현재 진행 중인 퀘스트 조회
     * @returns {Array} 진행 중인 퀘스트 목록
     */
    getActiveQuests() {
        return this.activeQuests;
    }

    /**
     * 완료된 퀘스트 목록 조회
     * @returns {Array} 완료된 퀘스트 목록
     */
    getCompletedQuests() {
        return this.completedQuests;
    }
}

// 예제 유저 데이터
const user = { name: "Player1", points: 0 };
const questSystem = new QuestSystem(user);

// 유저 상태 예제 (웨어러블 데이터와 연동 가능)
const userStatus = { steps: 3000, readingTime: 10, meditationTime: 5 };

// 퀘스트 생성
const newQuest = questSystem.generateQuest(userStatus);
console.log("🔹 새 퀘스트:", newQuest);

// 퀘스트 완료 처리
const completionMessage = questSystem.completeQuest(newQuest.id);
console.log("✅ 퀘스트 완료:", completionMessage);

// 현재 퀘스트 목록 확인
console.log("📌 진행 중 퀘스트:", questSystem.getActiveQuests());
console.log("🏆 완료된 퀘스트:", questSystem.getCompletedQuests());
console.log("💰 유저 포인트:", user.points);
