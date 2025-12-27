// 横屏滚动网站交互脚本

class HorizontalScrollWebsite {
  constructor() {
    this.currentSection = 0;
    this.totalSections = 5;
    this.isScrolling = false;
    this.scrollTimeout = null;
    
    this.init();
  }

  init() {
    this.setupHorizontalScroll();
    this.setupNavigation();
    this.setupProgressBar();
    this.setupAnimations();
    this.setupCardEffects();
    this.setupButtonEffects();
    this.setupAIEffects();
    this.setupParticleEffects();
    this.setupResponsive();
  }

  // 横屏滚动设置
  setupHorizontalScroll() {
    const container = document.querySelector('.horizontal-container');
    const sections = document.querySelectorAll('.section');
    
    // 鼠标滚轮横向滚动
    window.addEventListener('wheel', (e) => {
      if (this.isScrolling) return;
      
      e.preventDefault();
      
      const delta = e.deltaY > 0 ? 1 : -1;
      this.scrollToSection(this.currentSection + delta);
    }, { passive: false });

    // 键盘导航
    window.addEventListener('keydown', (e) => {
      if (this.isScrolling) return;
      
      switch(e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          this.scrollToSection(this.currentSection + 1);
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          this.scrollToSection(this.currentSection - 1);
          break;
        case 'Home':
          e.preventDefault();
          this.scrollToSection(0);
          break;
        case 'End':
          e.preventDefault();
          this.scrollToSection(this.totalSections - 1);
          break;
      }
    });

    // 触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', (e) => {
      if (this.isScrolling) return;
      
      touchEndX = e.changedTouches[0].screenX;
      const deltaX = touchStartX - touchEndX;
      
      if (Math.abs(deltaX) > 50) { // 最小滑动距离
        if (deltaX > 0) {
          this.scrollToSection(this.currentSection + 1);
        } else {
          this.scrollToSection(this.currentSection - 1);
        }
      }
    });
  }

  // 滚动到指定区域
  scrollToSection(index) {
    if (this.isScrolling || index < 0 || index >= this.totalSections) return;
    
    this.isScrolling = true;
    this.currentSection = index;
    
    const container = document.querySelector('.horizontal-container');
    const translateX = -index * 100;
    
    container.style.transform = `translateX(-${translateX}vw)`;
    
    // 更新进度条
    this.updateProgressBar();
    
    // 触发区域进入动画
    this.triggerSectionAnimations(index);
    
    // 更新导航高亮
    this.updateNavigationHighlight();
    
    // 重置滚动状态
    setTimeout(() => {
      this.isScrolling = false;
    }, 500);
  }

  // 导航设置
  setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach((link, index) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.scrollToSection(index);
      });
    });
  }

  // 更新导航高亮
  updateNavigationHighlight() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach((link, index) => {
      if (index === this.currentSection) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // 进度条设置
  setupProgressBar() {
    this.updateProgressBar();
  }

  // 更新进度条
  updateProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    const progress = ((this.currentSection + 1) / this.totalSections) * 100;
    
    progressFill.style.width = `${progress}%`;
  }

  // 动画设置
  setupAnimations() {
    // 创建 Intersection Observer 用于滚动触发动画
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.tool-card, .ai-card, .matrix-card, .vision-text');
    animatedElements.forEach(el => observer.observe(el));

    // 观察AI兔子动画
    const aiBunny = document.querySelector('.ai-bunny-main');
    if (aiBunny) {
      observer.observe(aiBunny);
    }
  }

  // 触发区域进入动画
  triggerSectionAnimations(sectionIndex) {
    const sections = document.querySelectorAll('.section');
    const currentSection = sections[sectionIndex];
    
    if (!currentSection) return;

    // 为当前区域的所有动画元素添加动画类
    const animatedElements = currentSection.querySelectorAll('.tool-card, .ai-card, .matrix-card, .vision-text, .ai-bunny-main');
    
    animatedElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('animate-in');
      }, index * 100); // 错开动画时间
    });

    // 特殊动画处理
    if (sectionIndex === 0) {
      this.triggerHeroAnimations();
    } else if (sectionIndex === 1) {
      this.triggerDesktopToolAnimations();
    } else if (sectionIndex === 2) {
      this.triggerAISolutionAnimations();
    } else if (sectionIndex === 3) {
      this.triggerMatrixAnimations();
    } else if (sectionIndex === 4) {
      this.triggerVisionAnimations();
    }
  }

  // Hero 区域动画
  triggerHeroAnimations() {
    const title = document.querySelector('.hero-title');
    const description = document.querySelector('.hero-description');
    const actions = document.querySelector('.hero-actions');
    
    if (title) {
      title.style.opacity = '0';
      title.style.transform = 'translateY(50px)';
      setTimeout(() => {
        title.style.transition = 'all 0.8s ease';
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
      }, 300);
    }
    
    if (description) {
      description.style.opacity = '0';
      description.style.transform = 'translateY(30px)';
      setTimeout(() => {
        description.style.transition = 'all 0.8s ease';
        description.style.opacity = '1';
        description.style.transform = 'translateY(0)';
      }, 600);
    }
    
    if (actions) {
      actions.style.opacity = '0';
      actions.style.transform = 'translateY(30px)';
      setTimeout(() => {
        actions.style.transition = 'all 0.8s ease';
        actions.style.opacity = '1';
        actions.style.transform = 'translateY(0)';
      }, 900);
    }
  }

  // 桌面工具动画
  triggerDesktopToolAnimations() {
    const cards = document.querySelectorAll('.tool-card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(50px) scale(0.9)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
      }, index * 200);
    });
  }

  // AI 解决方案动画
  triggerAISolutionAnimations() {
    const cards = document.querySelectorAll('.ai-card');
    const demo = document.querySelector('.ai-demo');
    
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateX(-50px)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateX(0)';
      }, index * 150);
    });
    
    if (demo) {
      demo.style.opacity = '0';
      setTimeout(() => {
        demo.style.transition = 'all 0.8s ease';
        demo.style.opacity = '1';
      }, 800);
    }
  }

  // 品牌矩阵动画
  triggerMatrixAnimations() {
    const cards = document.querySelectorAll('.matrix-card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.8) rotateY(15deg)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'scale(1) rotateY(0)';
      }, index * 100);
    });
  }

  // 品牌愿景动画
  triggerVisionAnimations() {
    const visionText = document.querySelector('.vision-text');
    const bunnySilhouette = document.querySelector('.bunny-silhouette');
    
    if (visionText) {
      visionText.style.opacity = '0';
      visionText.style.transform = 'translateY(30px)';
      setTimeout(() => {
        visionText.style.transition = 'all 0.8s ease';
        visionText.style.opacity = '1';
        visionText.style.transform = 'translateY(0)';
      }, 300);
    }
    
    if (bunnySilhouette) {
      bunnySilhouette.style.opacity = '0';
      bunnySilhouette.style.transform = 'scale(0.8)';
      setTimeout(() => {
        bunnySilhouette.style.transition = 'all 0.8s ease';
        bunnySilhouette.style.opacity = '1';
        bunnySilhouette.style.transform = 'scale(1)';
      }, 600);
    }
  }

  // 卡片悬停效果
  setupCardEffects() {
    const cards = document.querySelectorAll('.tool-card, .ai-card, .matrix-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  // 按钮涟漪效果
  setupButtonEffects() {
    const buttons = document.querySelectorAll('.cta-btn, .download-btn');
    
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }

  // AI 效果设置
  setupAIEffects() {
    // AI 演示动画
    const demoScreen = document.querySelector('.demo-ai-response');
    if (demoScreen) {
      this.startAIDemoAnimation();
    }
  }

  // AI 演示动画
  startAIDemoAnimation() {
    const responses = [
      "正在分析您的需求...",
      "检测到跨境电商平台优化机会",
      "推荐自动化解决方案：BunnyEra AI",
      "预计提升效率 300%",
      "✓ 解决方案已就绪"
    ];
    
    let currentResponse = 0;
    
    const updateResponse = () => {
      const responseText = document.querySelector('.response-text');
      const loadingDots = document.querySelector('.loading-dots');
      
      if (responseText && loadingDots) {
        // 显示加载动画
        loadingDots.style.display = 'flex';
        responseText.style.opacity = '0';
        
        setTimeout(() => {
          // 隐藏加载动画，显示响应
          loadingDots.style.display = 'none';
          responseText.textContent = responses[currentResponse];
          responseText.style.opacity = '1';
          
          currentResponse = (currentResponse + 1) % responses.length;
        }, 1500);
      }
    };
    
    // 每3秒更新一次演示
    setInterval(updateResponse, 3000);
    updateResponse(); // 立即执行一次
  }

  // 粒子效果设置
  setupParticleEffects() {
    // 创建背景粒子
    this.createBackgroundParticles();
    
    // 创建神经网络连接
    this.createNeuralNetwork();
  }

  // 创建背景粒子
  createBackgroundParticles() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach((section, sectionIndex) => {
      const particleCount = 20;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'bg-particle';
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'rgba(6, 182, 212, 0.6)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        
        // 随机位置
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // 动画
        particle.style.animation = `bg-particle-float ${5 + Math.random() * 10}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        section.appendChild(particle);
      }
    });
  }

  // 创建神经网络
  createNeuralNetwork() {
    const aiSection = document.querySelector('.ai-solutions-section');
    if (!aiSection) return;
    
    const networkContainer = document.createElement('div');
    networkContainer.className = 'neural-network-bg';
    networkContainer.style.position = 'absolute';
    networkContainer.style.top = '0';
    networkContainer.style.left = '0';
    networkContainer.style.width = '100%';
    networkContainer.style.height = '100%';
    networkContainer.style.pointerEvents = 'none';
    networkContainer.style.overflow = 'hidden';
    
    // 创建节点和连接
    const nodeCount = 15;
    const nodes = [];
    
    for (let i = 0; i < nodeCount; i++) {
      const node = document.createElement('div');
      node.className = 'neural-node-bg';
      node.style.position = 'absolute';
      node.style.width = '4px';
      node.style.height = '4px';
      node.style.background = 'rgba(139, 92, 246, 0.8)';
      node.style.borderRadius = '50%';
      node.style.animation = 'neural-node-pulse 3s ease-in-out infinite';
      node.style.animationDelay = Math.random() * 3 + 's';
      
      // 随机位置
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      node.style.left = x + '%';
      node.style.top = y + '%';
      
      nodes.push({ element: node, x, y });
      networkContainer.appendChild(node);
    }
    
    // 创建连接线
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = Math.sqrt(
          Math.pow(nodes[i].x - nodes[j].x, 2) + 
          Math.pow(nodes[i].y - nodes[j].y, 2)
        );
        
        // 只连接距离较近的节点
        if (distance < 30) {
          const connection = document.createElement('div');
          connection.className = 'neural-connection-bg';
          connection.style.position = 'absolute';
          connection.style.height = '1px';
          connection.style.background = 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent)';
          connection.style.animation = 'neural-connection-fade 4s ease-in-out infinite';
          connection.style.animationDelay = Math.random() * 4 + 's';
          
          // 计算连接线的位置和角度
          const angle = Math.atan2(nodes[j].y - nodes[i].y, nodes[j].x - nodes[i].x);
          const length = distance;
          
          connection.style.left = nodes[i].x + '%';
          connection.style.top = nodes[i].y + '%';
          connection.style.width = length + '%';
          connection.style.transformOrigin = '0 50%';
          connection.style.transform = `rotate(${angle}rad)`;
          
          networkContainer.appendChild(connection);
        }
      }
    }
    
    aiSection.appendChild(networkContainer);
  }

  // 响应式设计
  setupResponsive() {
    const checkMobile = () => {
      const isMobile = window.innerWidth <= 768;
      const container = document.querySelector('.horizontal-container');
      
      if (isMobile) {
        // 移动端：垂直滚动
        container.style.flexDirection = 'column';
        container.style.width = '100vw';
        container.style.height = 'auto';
        container.style.transform = 'none';
        
        // 隐藏滚动指示器
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
          scrollIndicator.style.display = 'none';
        }
      } else {
        // 桌面端：横向滚动
        container.style.flexDirection = 'row';
        container.style.width = '500vw';
        container.style.height = '100vh';
        
        // 显示滚动指示器
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
          scrollIndicator.style.display = 'flex';
        }
      }
    };
    
    // 初始检查
    checkMobile();
    
    // 监听窗口大小变化
    window.addEventListener('resize', checkMobile);
  }
}

// 添加额外的CSS动画
const additionalStyles = `
  @keyframes bg-particle-float {
    0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-50px) translateX(25px); opacity: 0; }
  }
  
  @keyframes neural-node-pulse {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.5); }
  }
  
  @keyframes neural-connection-fade {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
  }
  
  @keyframes fade-in {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(4); opacity: 0; }
  }
  
  .animate-in {
    animation: slide-in-up 0.8s ease-out forwards;
  }
  
  @keyframes slide-in-up {
    0% { opacity: 0; transform: translateY(50px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  .nav-link.active {
    color: var(--white);
  }
  
  .nav-link.active::after {
    width: 100%;
  }
`;

// 添加样式到页面
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  new HorizontalScrollWebsite();
  
  // 添加页面加载动画
  document.body.classList.add('loaded');
  
  // 延迟显示内容
  setTimeout(() => {
    const container = document.querySelector('.horizontal-container');
    if (container) {
      container.style.opacity = '1';
    }
  }, 500);
});

// 页面可见性变化时的处理
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // 页面隐藏时暂停动画
    document.body.classList.add('paused');
  } else {
    // 页面显示时恢复动画
    document.body.classList.remove('paused');
  }
});

// 添加加载状态样式
const loadingStyles = `
  body {
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  body.loaded {
    opacity: 1;
  }
  
  .horizontal-container {
    opacity: 0;
    transition: opacity 0.8s ease;
  }
  
  body.paused * {
    animation-play-state: paused !important;
  }
`;

const loadingStyleSheet = document.createElement('style');
loadingStyleSheet.textContent = loadingStyles;
document.head.appendChild(loadingStyleSheet);