const AuthService = require("./AuthService");

class QuestSystem {
    constructor(user) {
        this.user = user;
        this.activeQuests = [];
        this.completedQuests = [];
    }

    /**
     * 로그인한 유저만 퀘스트 요청 가능
     * @param {string} token - JWT 토큰
     * @param {Object} userStatus - 유저 상태 데이터
     * @returns {Object} 퀘스트 정보 또는 인증 실패 메시지
     */
    async generateQuest(token, userStatus) {
        const authResult = await AuthService.verifyToken(token);
        if (!authResult.user) {
            return { message: "로그인이 필요합니다." };
        }

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
}

module.exports = QuestSystem;
