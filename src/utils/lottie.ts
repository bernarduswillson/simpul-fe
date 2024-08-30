// Assets
import chatLoadingAnimation from "@/assets/animations/chat-loading.json";
import spinnerLoadingAnimation from "@/assets/animations/spinner-loading.json";
import taskLoadingAnimation from "@/assets/animations/task-loading.json";

// Chat Loading Animation
export const chatLoadingAnimationOptions = {
  loop: true,
  autoplay: true,
  animationData: chatLoadingAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

// Send Loading Animation
export const sendLoadingAnimationOptions = {
  loop: true,
  autoplay: true,
  animationData: spinnerLoadingAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

// Task Loading Animation
export const taskLoadingAnimationOptions = {
  loop: true,
  autoplay: true,
  animationData: taskLoadingAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}