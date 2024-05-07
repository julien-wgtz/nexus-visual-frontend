import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAppStore } from '@/store/appStore';
import { useTranslations } from 'next-intl';
import { AccountStatus } from '@/data/enum/Account';

interface MarketingBlockProps {
	// Define the props for your component here
}

const MarketingBlock: React.FC<MarketingBlockProps> = (props) => {
	const t = useTranslations('common');
	const accountStatus = useAppStore((state: any) => state.status);
	
	return (
		<>
		{accountStatus === AccountStatus.FREE && (
			<div className="mt-auto p-4">
			  <Card>
				<CardHeader>
				  <CardTitle>{t('upgrade-title')}</CardTitle>
				  <CardDescription>{t('upgrade-description')}</CardDescription>
				</CardHeader>
				<CardContent>
				  <Button size="sm" className="w-full">
					{t('upgrade-button')}
				  </Button>
				</CardContent>
			  </Card>
			</div>
		 )}
		</>
	);
};

export default MarketingBlock;