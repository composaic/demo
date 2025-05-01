import React, { ReactNode, useEffect, useState } from 'react';
import { useViewContext, ViewMessage } from '@composaic/web';
import { SignalService } from '@composaic/core';

import './PluginTestComponent.scss';

type Trade = {
    currencyPair: string;
    tradeDate: string;
};

const referenceNumberMap: { [key: string]: string } = {
    'EUR/USD': '12345',
    'GBP/USD': '67890',
    'USD/JPY': '54321',
};

export const PluginTestComponent: React.FC = (): ReactNode => {
    const { emit, on } = useViewContext();
    const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
    const [referenceNumber, setReferenceNumber] = useState<string>('');

    useEffect(() => {
        // Signal service setup
        (async () => {
            const signalService = await SignalService.getInstance();
            await signalService.send({
                type: 'notification',
                payload: { message: 'Hello from Signals' },
            });
        })();

        // Listen for trade selection changes
        const unsubscribe = on((msg: ViewMessage) => {
            if (msg.type === 'selectedTradeChanged') {
                const trade = msg.payload as Trade;
                console.log('Selected trade changed:', trade);
                setSelectedTrade(trade);
                setReferenceNumber(referenceNumberMap[trade.currencyPair]);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [on]);

    const onUseTrade = () => {
        emit({ type: 'useReference', payload: referenceNumber });
    };

    return (
        selectedTrade && (
            <div className="plugin-test-view">
                <p>Currency Pair: {selectedTrade.currencyPair}</p>
                <p>Trade Date: {selectedTrade.tradeDate}</p>
                <p>
                    Reference Number: {referenceNumber}{' '}
                    <button onClick={onUseTrade}>Use this ref</button>
                </p>
            </div>
        )
    );
};
