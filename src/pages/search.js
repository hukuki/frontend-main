import {
	Flex,
	Box,
	Input,
	Checkbox,
	Stack,
	Link,
	Button,
	Heading,
	Select,
	Text,
	useColorModeValue,
	Container,
	HStack,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	VStack,
} from '@chakra-ui/react';
import Navigation from './components/navigation.tsx';

const Login = () => {
	return (
		<>
			<Flex
				minH={'70vh'}
				minW={'80vw'}
				align={'center'}
				justify={'center'}
				bg={useColorModeValue('gray.50', 'gray.800')}>
				<Stack spacing={8} mx={'auto'} width={'3xl'} py={12} px={6}>
					<Stack align={'center'}>
						<Heading fontSize={'4xl'}>Doküman Arama</Heading>
					</Stack>
					<Box
						rounded={'xl'}
						bg={useColorModeValue('white', 'gray.700')}
						boxShadow={'lg'}
						p={16}
					>
						<HStack spacing={4} marginBottom={10}>
							<Select placeholder='Tür' flex={1}>
								<option>Mevzuat</option>
								<option>İçtihat</option>
							</Select>
							<Input placeholder='4. Yargıtay Kararları' flex={3} />
							<Button>Ara</Button>
						</HStack>
						<Accordion allowToggle>
							<AccordionItem>
								<h2>
									<AccordionButton>
										<Box as="span" flex='.5' textAlign='left'>
											Detaylı arama
										</Box>
										<AccordionIcon />
									</AccordionButton>
								</h2>
								<AccordionPanel pb={4} >
									<HStack>
										<FormControl flex={1}>
											<FormLabel>Yayın Tarihi</FormLabel>
											<Input
												placeholder="Select Date and Time"
												size="md"
												type="date"
											/>
										</FormControl>
										<FormControl flex={1}>
											<FormLabel>Yayın No.</FormLabel>
											<Input
												placeholder=""
												size="md"
												type="number"
											/>
										</FormControl>
									</HStack>
								</AccordionPanel>
							</AccordionItem>
						</Accordion>
					</Box>

				</Stack>
			</Flex>
		</>

	);
}

export default Login;