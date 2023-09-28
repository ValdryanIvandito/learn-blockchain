import { Box, Text } from '@chakra-ui/react';
import { useAssets, useWallet } from '@meshsdk/react';
import { Asset } from '@meshsdk/core';
import { useEffect, useState } from 'react';

export const ContributorComponent = () => {
	const { connected } = useWallet();
	const walletAssets = useAssets();

	const [connectedPPBL2023Token, setConnectedPPBL2023Token] = useState<
		Asset | undefined
	>(undefined);

	useEffect(() => {
		if (walletAssets) {
			const _ppbl2023 = walletAssets.filter(
				(a: Asset) =>
					a.unit.substring(0, 56) ==
					'05cf1f9c1e4cdcb6702ed2c978d55beff5e178b206b4ec7935d5e056'
			);
			setConnectedPPBL2023Token(_ppbl2023[0]);
		}
	}, [walletAssets]);

	return (
		<Box bg='theme.light' color='theme.dark' p='3'>
			<Text>Hello I am a new component. Find me in /src/components</Text>
			{connectedPPBL2023Token ? (
				<Box bg='green.400' m='2' p='2'>
					You have the token
				</Box>
			) : (
				<Box bg='red.400' m='2' p='2'>
					You do not have the token
				</Box>
			)}
		</Box>
	);
};