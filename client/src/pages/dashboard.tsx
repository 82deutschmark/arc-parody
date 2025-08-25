import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Chess piece Unicode characters
const chessPieces = {
  black: ['♜', '♞', '♝', '♛', '♚', '♟'],
  white: ['♖', '♘', '♗', '♕', '♔', '♙']
};

// Color themes for different boards
const boardThemes = [
  'neon-cyan',
  'electric-blue', 
  'neon-green',
  'purple-400',
  'neon-cyan',
  'electric-blue',
  'neon-green', 
  'purple-400',
  'neon-cyan',
  'electric-blue'
];

interface ChessSquare {
  piece: string | null;
  color: 'white' | 'black' | null;
  isAnimating: boolean;
}

interface ChessBoardState {
  squares: ChessSquare[];
  moveCount: number;
  gameId: string;
}

const initialChessPosition = (): ChessSquare[] => {
  const squares: ChessSquare[] = new Array(64).fill(null).map(() => ({ 
    piece: null, 
    color: null, 
    isAnimating: false 
  }));
  
  // Black pieces (top)
  const blackPieces = ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'];
  blackPieces.forEach((piece, i) => {
    squares[i] = { piece, color: 'black', isAnimating: Math.random() > 0.7 };
  });
  
  // Black pawns
  for (let i = 8; i < 16; i++) {
    squares[i] = { piece: '♟', color: 'black', isAnimating: Math.random() > 0.8 };
  }
  
  // White pawns
  for (let i = 48; i < 56; i++) {
    squares[i] = { piece: '♙', color: 'white', isAnimating: Math.random() > 0.8 };
  }
  
  // White pieces (bottom)
  const whitePieces = ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'];
  whitePieces.forEach((piece, i) => {
    squares[56 + i] = { piece, color: 'white', isAnimating: Math.random() > 0.7 };
  });
  
  return squares;
};

const ChessBoard = ({ boardId, theme }: { boardId: number; theme: string }) => {
  const [boardState, setBoardState] = useState<ChessBoardState>(() => ({
    squares: initialChessPosition(),
    moveCount: Math.floor(Math.random() * 300) + 1,
    gameId: String(boardId).padStart(3, '0')
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setBoardState(prev => ({
        ...prev,
        moveCount: prev.moveCount + Math.floor(Math.random() * 3) + 1,
        squares: prev.squares.map(square => ({
          ...square,
          isAnimating: square.piece ? Math.random() > 0.85 : false
        }))
      }));
    }, 800 + Math.random() * 1200);

    return () => clearInterval(interval);
  }, []);

  const getSquareColor = (index: number) => {
    const row = Math.floor(index / 8);
    const col = index % 8;
    return (row + col) % 2 === 0 ? 'bg-gray-800' : 'bg-gray-600';
  };

  const getPieceColor = (color: 'white' | 'black' | null, theme: string) => {
    if (!color) return '';
    if (color === 'black') return 'text-white';
    return `text-${theme}`;
  };

  return (
    <div className={`bg-dark-gray bg-opacity-60 rounded-lg border border-${theme} border-opacity-30 p-3 glow-effect`} data-testid={`chess-board-${boardId}`}>
      <div className={`text-xs text-${theme} mb-2 font-semibold`}>
        GAME #{boardState.gameId}
      </div>
      <div className="grid grid-cols-8 gap-0 aspect-square">
        {boardState.squares.map((square, index) => (
          <div
            key={index}
            className={`${getSquareColor(index)} flex items-center justify-center text-lg chess-piece ${getPieceColor(square.color, theme)}`}
          >
            {square.piece && (
              <motion.span
                className={square.isAnimating ? 'animate-piece-move' : ''}
                animate={square.isAnimating ? { 
                  x: [0, 16, -8, 0],
                  y: [0, -16, 8, 0]
                } : {}}
                transition={{ 
                  duration: 0.5, 
                  repeat: square.isAnimating ? Infinity : 0,
                  repeatType: "reverse"
                }}
              >
                {square.piece}
              </motion.span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-2 text-xs text-center">
        <div className="text-neon-green">Move: {boardState.moveCount}</div>
        <div className="text-gray-400">Δt: {(Math.random() * 0.004 + 0.001).toFixed(3)}ms</div>
      </div>
    </div>
  );
};

const StatisticsSidebar = () => {
  const [stats, setStats] = useState({
    accuracy: 99.89,
    nodesEvaluated: 47832961,
    searchDepth: '∞ (Quantum)',
    evalSpeed: '847.3M pos/s',
    entropy: '3.14159 ± 0.001',
    complexity: '10^47.3',
    alphaBetaPruning: '94.7%',
    minimax: '∇²φ = 0.997',
    variance: '0.00231',
    cpuUsage: 97.3,
    memory: '847.2GB',
    quantumCores: '1,024/1,024',
    temperature: '-273.15°C'
  });

  const [quantumCoeffs, setQuantumCoeffs] = useState({
    psi: 0.9987,
    lambda: 42.000,
    theta: 1.618,
    phi: 2.718,
    chi: 99.97,
    xi: 0.577
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        nodesEvaluated: prev.nodesEvaluated + Math.floor(Math.random() * 100000) + 10000,
        cpuUsage: Math.min(99.9, prev.cpuUsage + (Math.random() - 0.5) * 2),
        accuracy: Math.min(99.99, Math.max(99.85, prev.accuracy + (Math.random() - 0.5) * 0.02))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-80 bg-dark-gray bg-opacity-90 border-l border-neon-cyan border-opacity-30 p-6 overflow-y-auto" data-testid="statistics-sidebar">
      <div className="space-y-6">
        {/* Main Accuracy Display */}
        <div className="text-center mb-8">
          <motion.div 
            className="text-4xl font-bold text-neon-cyan animate-pulse-glow mb-2"
            animate={{ textShadow: ['0 0 10px currentColor', '0 0 20px currentColor', '0 0 10px currentColor'] }}
            transition={{ duration: 2, repeat: Infinity }}
            data-testid="accuracy-display"
          >
            {stats.accuracy.toFixed(2)}%
          </motion.div>
          <div className="text-sm text-gray-400">QUANTUM ACCURACY</div>
          <div className="w-full bg-gray-700 rounded-full h-3 mt-3">
            <div 
              className="bg-gradient-to-r from-neon-cyan to-neon-green h-3 rounded-full glow-effect transition-all duration-1000" 
              style={{ width: `${stats.accuracy}%` }}
            ></div>
          </div>
        </div>

        {/* Algorithm Performance */}
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 border border-neon-green border-opacity-30">
          <h3 className="text-neon-green font-semibold mb-3 animate-pulse-glow">NEURAL NETWORK STATUS</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Algorithm:</span>
              <span className="text-neon-cyan">DeepChess-Ω</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Nodes Evaluated:</span>
              <span className="text-white font-mono" data-testid="nodes-evaluated">
                {stats.nodesEvaluated.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Search Depth:</span>
              <span className="text-neon-green">{stats.searchDepth}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Eval Speed:</span>
              <span className="text-electric-blue">{stats.evalSpeed}</span>
            </div>
          </div>
        </div>

        {/* Mathematical Metrics */}
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 border border-electric-blue border-opacity-30">
          <h3 className="text-electric-blue font-semibold mb-3 animate-pulse-glow">MATHEMATICAL ANALYSIS</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Entropy (H):</span>
              <span className="text-white font-mono">{stats.entropy}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Complexity (Ω):</span>
              <span className="text-neon-cyan font-mono">{stats.complexity}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">α-β Pruning:</span>
              <span className="text-neon-green font-mono">{stats.alphaBetaPruning}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Minimax (δ):</span>
              <span className="text-purple-400 font-mono">{stats.minimax}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Variance (σ²):</span>
              <span className="text-white font-mono">{stats.variance}</span>
            </div>
          </div>
        </div>

        {/* Greek Letter Statistics */}
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 border border-purple-500 border-opacity-30">
          <h3 className="text-purple-400 font-semibold mb-3 animate-pulse-glow">QUANTUM COEFFICIENTS</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="text-center" data-testid="coeff-psi">
              <div className="text-neon-cyan font-bold text-lg">Ψ</div>
              <div className="text-white font-mono">{quantumCoeffs.psi}</div>
              <div className="text-gray-400 text-xs">Wave Function</div>
            </div>
            <div className="text-center" data-testid="coeff-lambda">
              <div className="text-neon-green font-bold text-lg">Λ</div>
              <div className="text-white font-mono">{quantumCoeffs.lambda.toFixed(3)}</div>
              <div className="text-gray-400 text-xs">Eigenvalue</div>
            </div>
            <div className="text-center" data-testid="coeff-theta">
              <div className="text-electric-blue font-bold text-lg">Θ</div>
              <div className="text-white font-mono">{quantumCoeffs.theta}</div>
              <div className="text-gray-400 text-xs">Golden Ratio</div>
            </div>
            <div className="text-center" data-testid="coeff-phi">
              <div className="text-purple-400 font-bold text-lg">Φ</div>
              <div className="text-white font-mono">{quantumCoeffs.phi}</div>
              <div className="text-gray-400 text-xs">Euler's Number</div>
            </div>
            <div className="text-center" data-testid="coeff-chi">
              <div className="text-neon-cyan font-bold text-lg">Χ</div>
              <div className="text-white font-mono">{quantumCoeffs.chi}</div>
              <div className="text-gray-400 text-xs">Chi-Square</div>
            </div>
            <div className="text-center" data-testid="coeff-xi">
              <div className="text-neon-green font-bold text-lg">Ξ</div>
              <div className="text-white font-mono">{quantumCoeffs.xi}</div>
              <div className="text-gray-400 text-xs">Euler-Mascheroni</div>
            </div>
          </div>
        </div>

        {/* Real-time Performance */}
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 border border-neon-cyan border-opacity-30">
          <h3 className="text-neon-cyan font-semibold mb-3 animate-pulse-glow">REAL-TIME METRICS</h3>
          <div className="space-y-3">
            {/* Data Flow Animation */}
            <div className="relative overflow-hidden h-6 bg-gray-700 rounded">
              <motion.div 
                className="absolute inset-0 data-stream"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />
              <div className="relative z-10 text-xs text-center pt-1 text-white">Neural Data Flow</div>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">CPU Usage:</span>
              <span className="text-neon-green animate-pulse-glow" data-testid="cpu-usage">
                {stats.cpuUsage.toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Memory:</span>
              <span className="text-electric-blue animate-pulse-glow">{stats.memory}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Quantum Cores:</span>
              <span className="text-purple-400 animate-pulse-glow">{stats.quantumCores}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Temperature:</span>
              <span className="text-red-400 animate-pulse-glow">{stats.temperature}</span>
            </div>
          </div>
        </div>

        {/* Advanced Statistics */}
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 border border-neon-green border-opacity-30">
          <h3 className="text-neon-green font-semibold mb-3 animate-pulse-glow">ADVANCED ANALYTICS</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-300">Monte Carlo Trees:</span>
              <span className="text-white font-mono">∑ 9.87×10⁶</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Bayesian Inference:</span>
              <span className="text-neon-cyan font-mono">P(Win) = 0.9989</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Neural Gradient:</span>
              <span className="text-electric-blue font-mono">∇L = -0.0001</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Hessian Matrix:</span>
              <span className="text-purple-400 font-mono">det(H) {'>'}  0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Information Gain:</span>
              <span className="text-neon-green font-mono">IG = 47.832 bits</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Quantum Entanglement:</span>
              <span className="text-white font-mono">|ψ⟩ = √½(|00⟩+|11⟩)</span>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 border border-electric-blue border-opacity-30">
          <h3 className="text-electric-blue font-semibold mb-3 animate-pulse-glow">SYSTEM STATUS</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Quantum State:</span>
              <span className="text-neon-green animate-pulse" data-testid="quantum-state">◉ COHERENT</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Neural Sync:</span>
              <span className="text-neon-cyan animate-pulse" data-testid="neural-sync">◉ OPTIMAL</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Matrix Stability:</span>
              <span className="text-electric-blue animate-pulse" data-testid="matrix-stability">◉ STABLE</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Superposition:</span>
              <span className="text-purple-400 animate-pulse" data-testid="superposition">◉ ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="bg-deep-black text-white font-mono overflow-hidden min-h-screen" data-testid="chess-dashboard">
      {/* Matrix Background Effect */}
      <div className="fixed inset-0 matrix-bg neural-grid opacity-20"></div>
      
      {/* Header */}
      <header className="relative z-10 bg-dark-gray bg-opacity-90 border-b border-neon-cyan border-opacity-30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-neon-cyan to-electric-blue rounded-lg flex items-center justify-center glow-effect">
              <span className="text-2xl font-bold">♔</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neon-cyan animate-pulse-glow" data-testid="main-title">
                CHESS.AI QUANTUM MATRIX
              </h1>
              <p className="text-sm text-gray-400">Advanced Neural Chess Algorithm v3.141592</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">STATUS</div>
            <div className="text-neon-green font-bold animate-pulse-glow" data-testid="system-status">
              ◉ ACTIVE
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-screen pt-20">
        {/* Chess Grids Container */}
        <div className="flex-1 p-6 overflow-hidden" data-testid="chess-grids-container">
          <div className="grid grid-cols-5 gap-4 h-full">
            {Array.from({ length: 10 }, (_, index) => (
              <ChessBoard 
                key={index} 
                boardId={index + 1} 
                theme={boardThemes[index]} 
              />
            ))}
          </div>
        </div>

        {/* Statistics Sidebar */}
        <StatisticsSidebar />
      </div>
    </div>
  );
}
