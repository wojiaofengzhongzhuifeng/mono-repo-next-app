import React from 'react';
import { Button } from "@/components/ui/button";
import { useCountNumberStore } from "@/source/store/countNumberStore";

function StoreTest() {
    const {
        count,
        id,
        testList,
        loading,
        error,
        incrementCount,
        decrementCount,
        setCount,
        clearError,
        reset,
    } = useCountNumberStore();

    const handleQuickTest = () => {
        // 快速测试：增加计数
        incrementCount();
        setTimeout(() => {
            decrementCount();
        }, 1000);
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Zustand Store 测试</h1>
            
            {/* 状态显示 */}
            <div className="mb-6 space-y-2">
                <div className="flex justify-between">
                    <span className="font-semibold">Count:</span>
                    <span className="text-blue-600">{count}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold">ID:</span>
                    <span className="text-green-600">{id || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold">Loading:</span>
                    <span className={loading ? 'text-red-600' : 'text-gray-600'}>
                        {loading ? 'Yes' : 'No'}
                    </span>
                </div>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
                        Error: {error}
                    </div>
                )}
                {testList.length > 0 && (
                    <div className="flex justify-between">
                        <span className="font-semibold">Test List:</span>
                        <span className="text-purple-600">[{testList.join(', ')}]</span>
                    </div>
                )}
            </div>

            {/* 操作按钮 */}
            <div className="space-y-3">
                <div className="flex gap-2">
                    <Button 
                        onClick={incrementCount} 
                        variant="default"
                        className="flex-1"
                    >
                        +1
                    </Button>
                    <Button 
                        onClick={decrementCount} 
                        variant="default"
                        className="flex-1"
                    >
                        -1
                    </Button>
                </div>

                <Button 
                    onClick={handleQuickTest}
                    variant="secondary"
                    className="w-full"
                >
                    快速测试 (+1 后 -1)
                </Button>

                <Button 
                    onClick={() => setCount(Math.floor(Math.random() * 100))}
                    variant="outline"
                    className="w-full"
                >
                    随机设置值
                </Button>

                <div className="flex gap-2">
                    <Button 
                        onClick={clearError}
                        variant="outline"
                        className="flex-1"
                    >
                        清除错误
                    </Button>
                    <Button 
                        onClick={reset}
                        variant="destructive"
                        className="flex-1"
                    >
                        重置
                    </Button>
                </div>
            </div>

            {/* 说明 */}
            <div className="mt-6 text-sm text-gray-600 bg-gray-50 p-3 rounded">
                <h3 className="font-semibold mb-2">功能说明：</h3>
                <ul className="space-y-1 text-xs">
                    <li>• 数据持久化到 localStorage</li>
                    <li>• 支持 Redux DevTools 调试</li>
                    <li>• 包含错误处理和加载状态</li>
                    <li>• 集成了 API 请求功能</li>
                </ul>
            </div>
        </div>
    );
}

export default StoreTest;