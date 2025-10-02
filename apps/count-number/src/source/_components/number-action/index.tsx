import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCountNumberStore } from "@/source/store/countNumberStore";

interface NumberActionProps {
    data?: number;
}

function NumberAction({ data }: NumberActionProps) {
    const {
        count,
        id,
        testList,
        loading,
        error,
        fetchCountNumber,
        incrementCount,
        decrementCount,
        setCount,
        submitCountNumber,
        clearError,
        reset,
    } = useCountNumberStore();

    // 组件挂载时获取数据
    useEffect(() => {
        fetchCountNumber();
    }, []);

    // 处理增加
    const handleIncrement = () => {
        incrementCount();
    };

    // 处理减少
    const handleDecrement = () => {
        decrementCount();
    };

    // 处理设置值
    const handleSetCount = () => {
        const newValue = prompt('请输入新的计数值:', count.toString());
        if (newValue !== null) {
            const num = parseInt(newValue, 10);
            if (!isNaN(num)) {
                setCount(num);
            }
        }
    };

    // 处理提交
    const handleSubmit = async () => {
        try {
            await submitCountNumber({ number: count });
            alert('提交成功！');
        } catch (error) {
            alert('提交失败：' + (error instanceof Error ? error.message : '未知错误'));
        }
    };

    // 处理重新获取
    const handleRefresh = () => {
        fetchCountNumber();
    };

    // 处理重置
    const handleReset = () => {
        reset();
    };

    // 处理清除错误
    const handleClearError = () => {
        clearError();
    };

    if (loading) {
        return (
            <div className="p-4">
                <div className="text-center">加载中...</div>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-4">
            {/* 错误显示 */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p className="font-bold">错误：</p>
                    <p>{error}</p>
                    <Button 
                        onClick={handleClearError}
                        variant="outline"
                        size="sm"
                        className="mt-2"
                    >
                        清除错误
                    </Button>
                </div>
            )}

            {/* 计数显示 */}
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">当前计数: {count}</h2>
                {id && <p className="text-gray-600">ID: {id}</p>}
                {testList.length > 0 && (
                    <p className="text-gray-600">
                        测试列表: [{testList.join(', ')}]
                    </p>
                )}
            </div>

            {/* 操作按钮 */}
            <div className="flex flex-wrap gap-2 justify-center">
                <Button onClick={handleIncrement} variant="default">
                    +1
                </Button>
                <Button onClick={handleDecrement} variant="default">
                    -1
                </Button>
                <Button onClick={handleSetCount} variant="outline">
                    设置值
                </Button>
                <Button onClick={handleSubmit} variant="secondary">
                    提交
                </Button>
                <Button onClick={handleRefresh} variant="outline">
                    刷新
                </Button>
                <Button onClick={handleReset} variant="destructive">
                    重置
                </Button>
            </div>

            {/* 调试信息 */}
            <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
                <p>传入的 data: {data}</p>

                <p>Store 状态: loading={loading.toString()}, error={error}</p>
            </div>
        </div>
    );
}

export default NumberAction;