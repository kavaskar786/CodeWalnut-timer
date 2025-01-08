# **Timer App**

A feature-rich Timer App built using React, Vite, Tailwind CSS, and Vitest. This project demonstrates skills in UI implementation, state management, code quality, responsiveness, and testing best practices.

---

Check here the [demo](https://codewalnut-timer.onrender.com/)

---

## **Sample Screenshots**

### **Simultaneous Timers**

![Simultaneous Timers Screenshot](https://i.ibb.co/N2JMHQG/Screenshot-2025-01-08-100451.png)

### **Snack Bar Notifications**

![Snack Bar Screenshot](https://i.ibb.co/k4nsK5Q/Screenshot-2025-01-08-100639.png)

### **Add/Edit Timer Modal**

![Modal Screenshot](https://i.ibb.co/Vg73xPs/Screenshot-2025-01-08-101136.png)

## **Features**

- **Simultaneous Timers**: Run and manage multiple timers concurrently.
- **Snack Bar Notifications**: Display notifications with responsive placement and sound persistence until dismissal.
- **Responsive Design**: Adapt UI components for desktop and mobile devices.
- **Reusable Components**: Modular design with reusable buttons and modal components.
- **Validation Feedback**: Error snack bars for invalid form submissions.
- **Data Persistence**: Timers persist across page refreshes using `localStorage`.
- **Testing**: Comprehensive unit test to ensure app reliability.

---

## **Tech Stack**

- **Frontend Framework**: React (with Vite for fast development)
- **Styling**: Tailwind CSS
- **Testing Framework**: Vitest (for unit and component testing)

---

## **Installation and Setup**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/CW-Codewalnut/timer.git
   ```
2. **Navigate to the Project Directory**:
   ```bash
   cd timer
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
5. **Run Tests**:
   ```bash
   npm vitest
   ```

---

## **Implemented Features**

### 1. **Simultaneous Timers**

- Updated the app to allow multiple timers to run concurrently, ensuring each timer operates independently.

### 2. **Snack Bar Notifications**

- Displays a snack bar when a timer completes, accompanied by a persistent notification sound until dismissed.
- Resolved the console error that occurred when the snack bar dismiss button was clicked.

### 3. **Reusable Components**

- Extracted common buttons used in the Add/Edit Timer Modal into a reusable component.
- Consolidated modal logic to use a single component for both adding and editing timers, eliminating code duplication.

### 4. **Validation Feedback**

- Added an error snack bar for invalid form submissions, providing immediate feedback to the user.

### 5. **Responsive Snack Bar Placement**

- **Desktop Devices**: Snack bars appear in the top-right corner.
- **Mobile Devices**: Snack bars appear at the bottom of the screen.

### 6. **Timer Persistence**

- Leveraged `localStorage` to save and restore timers across page refreshes, ensuring seamless user experience.

### 7. **Testing**

- Added unit tests for `validation.ts` to verify all validation rules.

---

## **Enhancements Made**

- Improved the snack bar UX with subtle animations.
- Refactored modal code for cleaner logic and easier scalability.
- Enhanced error handling for better user feedback.

## **How to Use**

1. **Add a Timer**:

   - Click the "Add Timer" button.
   - Fill in the required details and submit the form.

2. **Edit a Timer**:

   - Click the edit icon next to an existing timer.
   - Update the timer details and save changes.

3. **Run Multiple Timers**:

   - Start any number of timers and watch them run simultaneously.

4. **Snack Bar Notifications**:
   - Notifications will appear when a timer completes. Dismiss the snack bar to stop the sound.

---

## **Acknowledgments**

This project was designed as part of the Timer App Assignment to evaluate and improve my skills in React development, state management, UI design, and testing.
