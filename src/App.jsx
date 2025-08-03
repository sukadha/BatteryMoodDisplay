import React, { useState, useEffect } from 'react';

const BatteryAvatar = () => {
  const [batteryLevel, setBatteryLevel] = useState(50);
  const [isCharging, setIsCharging] = useState(false);
  const [batterySupported, setBatterySupported] = useState(false);
  const [showEffectsMenu, setShowEffectsMenu] = useState(false);
  const [selectedEffect, setSelectedEffect] = useState('auto');

  // Real battery API integration
  useEffect(() => {
    const getBatteryInfo = async () => {
      try {
        if ('getBattery' in navigator) {
          const battery = await navigator.getBattery();
          setBatteryLevel(Math.floor(battery.level * 100));
          setIsCharging(battery.charging);
          setBatterySupported(true);
          
          // Listen for battery changes
          battery.addEventListener('chargingchange', () => {
            setIsCharging(battery.charging);
          });
          
          battery.addEventListener('levelchange', () => {
            setBatteryLevel(Math.floor(battery.level * 100));
          });
        } else {
          // Fallback simulation for unsupported browsers
          setBatterySupported(false);
          simulateBattery();
        }
      } catch (error) {
        setBatterySupported(false);
        simulateBattery();
      }
    };

    const simulateBattery = () => {
      const interval = setInterval(() => {
        setBatteryLevel(prev => {
          if (isCharging) {
            return prev >= 100 ? 100 : prev + 1;
          } else {
            return prev <= 0 ? 0 : prev - 1;
          }
        });
      }, 200);

      return () => clearInterval(interval);
    };

    getBatteryInfo();
  }, [isCharging]);

  // Get avatar character based on battery level or selected effect
  const getAvatarCharacter = () => {
    if (selectedEffect !== 'auto') {
      const effectMap = {
        happy: {
          character: '🚀',
          color: '#4CAF50',
          expression: '😄',
          hat: '👑',
          effect: 'happy'
        },
        party: {
          character: '🎉',
          color: '#FF6B35',
          expression: '🥳',
          hat: '🎊',
          effect: 'party'
        },
        cool: {
          character: '😎',
          color: '#2196F3',
          expression: '😎',
          hat: '🕶️',
          effect: 'cool'
        },
        angry: {
          character: '💥',
          color: '#f44336',
          expression: '😡',
          hat: '⚡',
          effect: 'angry'
        },
        sleepy: {
          character: '💤',
          color: '#9C27B0',
          expression: '😴',
          hat: '🌙',
          effect: 'sleepy'
        },
        love: {
          character: '💖',
          color: '#E91E63',
          expression: '😍',
          hat: '💕',
          effect: 'love'
        }
      };
      return effectMap[selectedEffect] || effectMap.happy;
    }

    if (isCharging) {
      return {
        character: '⚡',
        color: '#00ff88',
        expression: '😊',
        hat: '🔌',
        effect: 'charging'
      };
    } else if (batteryLevel > 80) {
      return {
        character: '🚀',
        color: '#4CAF50',
        expression: '😄',
        hat: '👑',
        effect: 'happy'
      };
    } else if (batteryLevel > 60) {
      return {
        character: '🌟',
        color: '#8BC34A',
        expression: '😊',
        hat: '🎩',
        effect: 'good'
      };
    } else if (batteryLevel > 40) {
      return {
        character: '⚽',
        color: '#FF9800',
        expression: '😐',
        hat: '🧢',
        effect: 'neutral'
      };
    } else if (batteryLevel > 20) {
      return {
        character: '🔋',
        color: '#FFC107',
        expression: '😟',
        hat: '🎭',
        effect: 'worried'
      };
    } else {
      return {
        character: '💀',
        color: '#f44336',
        expression: '😵',
        hat: '⚠️',
        effect: 'critical'
      };
    }
  };

  const avatar = getAvatarCharacter();

  const effectOptions = [
    { id: 'auto', name: 'Auto (Battery Based)', icon: '🔄' },
    { id: 'happy', name: 'Happy Mode', icon: '😄' },
    { id: 'party', name: 'Party Mode', icon: '🎉' },
    { id: 'cool', name: 'Cool Mode', icon: '😎' },
    { id: 'angry', name: 'Angry Mode', icon: '😡' },
    { id: 'sleepy', name: 'Sleepy Mode', icon: '😴' },
    { id: 'love', name: 'Love Mode', icon: '💖' }
  ];

  const styles = {
    container: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      background: `linear-gradient(135deg, ${avatar.color}20 0%, #667eea 50%, #764ba2 100%)`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
      transition: 'background 1s ease',
      overflow: 'hidden',
      zIndex: 9999
    },
    wallpaperContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      width: '100%',
      height: '100%',
      justifyContent: 'center'
    },
    avatarCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '30px',
      padding: '40px',
      border: `3px solid ${avatar.color}`,
      boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 30px ${avatar.color}40`,
      transition: 'all 0.5s ease',
      transform: (isCharging || avatar.effect === 'party') ? 'scale(1.05)' : 'scale(1)',
      animation: avatar.effect === 'critical' ? 'shake 0.5s infinite' : 
                 avatar.effect === 'charging' ? 'pulse 2s infinite' :
                 avatar.effect === 'party' ? 'party 1s infinite' :
                 avatar.effect === 'angry' ? 'shake 0.3s infinite' : 'none',
      maxWidth: '450px',
      width: '90vw',
      position: 'relative'
    },
    avatarContainer: {
      position: 'relative',
      width: '250px',
      height: '250px',
      margin: '0 auto 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    avatarBody: {
      width: '200px',
      height: '200px',
      background: `radial-gradient(circle at 30% 30%, ${avatar.color}, ${avatar.color}80)`,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '80px',
      position: 'relative',
      border: `4px solid rgba(255,255,255,0.3)`,
      boxShadow: `inset 0 0 20px rgba(0,0,0,0.2), 0 0 20px ${avatar.color}60`,
      transform: (isCharging || avatar.effect === 'cool') ? 'rotateY(10deg)' : 'rotateY(0deg)',
      transition: 'transform 0.5s ease'
    },
    avatarHat: {
      position: 'absolute',
      top: '-30px',
      fontSize: '50px',
      transform: 'rotate(-15deg)',
      filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
      animation: avatar.effect === 'party' ? 'bounce 0.5s infinite' : 'none'
    },
    avatarFace: {
      position: 'absolute',
      bottom: '20px',
      fontSize: '40px',
      filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.5))'
    },
    batteryIndicator: {
      position: 'absolute',
      top: '-15px',
      right: '-15px',
      background: avatar.color,
      color: '#fff',
      borderRadius: '25px',
      padding: '10px 15px',
      fontSize: '16px',
      fontWeight: 'bold',
      border: '3px solid #fff',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
    },
    batteryPercentage: {
      fontSize: '96px',
      fontWeight: 'bold',
      color: '#fff',
      textShadow: `0 0 20px ${avatar.color}`,
      marginBottom: '15px',
      fontFamily: 'Arial, sans-serif'
    },
    batteryStatus: {
      fontSize: '24px',
      color: '#fff',
      opacity: 0.9,
      marginBottom: '30px',
      fontWeight: '500'
    },
    progressBar: {
      width: '350px',
      height: '25px',
      background: 'rgba(255,255,255,0.2)',
      borderRadius: '15px',
      overflow: 'hidden',
      margin: '30px 0',
      border: '3px solid rgba(255,255,255,0.3)'
    },
    progressFill: {
      height: '100%',
      background: `linear-gradient(90deg, ${avatar.color}, ${avatar.color}80)`,
      width: `${batteryLevel}%`,
      borderRadius: '12px',
      transition: 'width 0.8s ease',
      boxShadow: `0 0 15px ${avatar.color}`
    },
    chargingEffect: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: '120px',
      opacity: (isCharging || avatar.effect === 'angry') ? 0.8 : 0,
      transition: 'opacity 0.3s ease',
      animation: (isCharging || avatar.effect === 'angry') ? 'lightning 1s infinite' : 'none',
      pointerEvents: 'none',
      filter: 'drop-shadow(0 0 15px #ffff00)',
      zIndex: 2
    },
    supportInfo: {
      marginTop: '25px',
      fontSize: '16px',
      color: 'rgba(255,255,255,0.7)',
      fontStyle: 'italic'
    },
    particleEffect: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      overflow: 'hidden',
      borderRadius: '50%'
    },
    particle: {
      position: 'absolute',
      width: '6px',
      height: '6px',
      background: avatar.color,
      borderRadius: '50%',
      opacity: (isCharging || avatar.effect === 'party' || avatar.effect === 'love') ? 1 : 0,
      animation: (isCharging || avatar.effect === 'party' || avatar.effect === 'love') ? 'float 2s infinite ease-in-out' : 'none'
    },
    effectsButton: {
      position: 'absolute',
      bottom: '-25px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '25px',
      padding: '10px 20px',
      color: '#fff',
      fontSize: '14px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      zIndex: 10
    },
    effectsButtonHover: {
      background: 'rgba(255, 255, 255, 0.3)',
      transform: 'translateX(-50%) scale(1.05)',
      boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
    },
    effectsMenu: {
      position: 'absolute',
      bottom: '60px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: '15px',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      minWidth: '250px',
      maxHeight: '300px',
      overflowY: 'auto',
      zIndex: 11,
      opacity: showEffectsMenu ? 1 : 0,
      visibility: showEffectsMenu ? 'visible' : 'hidden',
      transition: 'all 0.3s ease'
    },
    effectOption: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 15px',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      color: '#fff',
      fontSize: '14px',
      marginBottom: '5px'
    },
    effectOptionHover: {
      background: 'rgba(255, 255, 255, 0.1)',
      transform: 'translateX(5px)'
    },
    effectOptionActive: {
      background: `${avatar.color}40`,
      border: `1px solid ${avatar.color}`
    },
    effectIcon: {
      fontSize: '20px'
    }
  };

  // Add keyframes for animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 100% { transform: scale(1.05); }
        50% { transform: scale(1.1); }
      }
      
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      
      @keyframes lightning {
        0%, 80%, 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
        40% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
      }
      
      @keyframes float {
        0% { transform: translateY(0px) scale(0); opacity: 1; }
        50% { transform: translateY(-30px) scale(1); opacity: 0.8; }
        100% { transform: translateY(-60px) scale(0); opacity: 0; }
      }
      
      @keyframes party {
        0%, 100% { transform: scale(1.05) rotateZ(0deg); }
        25% { transform: scale(1.08) rotateZ(2deg); }
        75% { transform: scale(1.08) rotateZ(-2deg); }
      }
      
      @keyframes bounce {
        0%, 100% { transform: rotate(-15deg) translateY(0px); }
        50% { transform: rotate(-15deg) translateY(-10px); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  // Create floating particles for special effects
  const renderParticles = () => {
    if (!isCharging && avatar.effect !== 'party' && avatar.effect !== 'love') return null;
    
    const particleCount = avatar.effect === 'party' ? 16 : 12;
    return Array.from({ length: particleCount }, (_, i) => (
      <div
        key={i}
        style={{
          ...styles.particle,
          left: `${10 + (i * 6)}%`,
          animationDelay: `${i * 0.1}s`,
          background: avatar.effect === 'love' ? '#ff69b4' : avatar.color
        }}
      />
    ));
  };

  const handleEffectSelect = (effectId) => {
    setSelectedEffect(effectId);
    setShowEffectsMenu(false);
  };

  const toggleEffectsMenu = () => {
    setShowEffectsMenu(!showEffectsMenu);
  };

  return (
    <div style={styles.container}>
      <div style={styles.wallpaperContainer}>
        <div style={styles.avatarCard}>
          <div style={styles.batteryPercentage}>{batteryLevel}%</div>
          <div style={styles.batteryStatus}>
            {isCharging ? '⚡ Charging...' : '🔋 On Battery'}
          </div>
          
          <div style={styles.avatarContainer}>
            <div style={styles.avatarBody}>
              <div style={styles.avatarHat}>{avatar.hat}</div>
              <div>{avatar.character}</div>
              <div style={styles.avatarFace}>{avatar.expression}</div>
              <div style={styles.batteryIndicator}>
                {isCharging ? '🔌' : '🔋'}
              </div>
              <div style={styles.chargingEffect}>⚡</div>
              <div style={styles.particleEffect}>
                {renderParticles()}
              </div>
            </div>
          </div>
          
          <div style={styles.progressBar}>
            <div style={styles.progressFill}></div>
          </div>
          
          <div style={styles.supportInfo}>
            {batterySupported ? 
              '🟢 Real-time battery monitoring active' : 
              '🔄 Simulated battery (API not supported)'
            }
          </div>

          {/* Effects Button */}
          <button
            style={styles.effectsButton}
            onClick={toggleEffectsMenu}
            onMouseEnter={(e) => {
              Object.assign(e.target.style, styles.effectsButtonHover);
            }}
            onMouseLeave={(e) => {
              Object.assign(e.target.style, styles.effectsButton);
            }}
          >
            <span>🎨</span>
            <span>Effects</span>
            <span style={{ transform: showEffectsMenu ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>▼</span>
          </button>

          {/* Effects Menu */}
          <div style={styles.effectsMenu}>
            {effectOptions.map((option) => (
              <div
                key={option.id}
                style={{
                  ...styles.effectOption,
                  ...(selectedEffect === option.id ? styles.effectOptionActive : {})
                }}
                onClick={() => handleEffectSelect(option.id)}
                onMouseEnter={(e) => {
                  if (selectedEffect !== option.id) {
                    Object.assign(e.target.style, styles.effectOptionHover);
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedEffect !== option.id) {
                    e.target.style.background = 'transparent';
                    e.target.style.transform = 'translateX(0px)';
                  }
                }}
              >
                <span style={styles.effectIcon}>{option.icon}</span>
                <span>{option.name}</span>
                {selectedEffect === option.id && <span style={{ marginLeft: 'auto' }}>✓</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatteryAvatar;