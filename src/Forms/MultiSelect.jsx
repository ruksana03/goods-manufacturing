import  { useState } from 'react';
import {
    Box,
    HStack,
    Tag,
    TagLabel,
    TagCloseButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItemOption,
    MenuOptionGroup,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const MultiSelect = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const predefinedOptions = [
        { value: 'product 22', label: 'Product 22' },
        { value: 'product 5', label: 'Product 5' },
        { value: 'stocked product i', label: 'Stocked Product I' },
        { value: 'benoit saint denis', label: 'Benoit Saint Denis' },
        { value: 'anonymous product', label: 'Anonymous Product' },
        { value: 'stocked tea i', label: 'Stocked Tea I' },
        { value: 'stocked tea ii', label: 'Stocked Tea II' },
    ];

    const handleSelectChange = (values) => {
        const selected = predefinedOptions.filter(option => values.includes(option.value));
        setSelectedOptions(selected);
    };

    const handleRemoveTag = (tagToRemove) => {
        setSelectedOptions(selectedOptions.filter(option => option.value !== tagToRemove.value));
    };

    return (
        <Box>
            <HStack spacing={4} wrap="wrap">
                {selectedOptions.map((option) => (
                    <Tag
                        size='md'
                        key={option.value}
                        borderRadius='full'
                        variant='solid'
                        colorScheme='green'
                    >
                        <TagLabel>{option.label}</TagLabel>
                        <TagCloseButton onClick={() => handleRemoveTag(option)} />
                    </Tag>
                ))}
                <Menu closeOnSelect={false}>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Select Products
                    </MenuButton>
                    <MenuList minWidth="240px">
                        <MenuOptionGroup
                            title="Products"
                            type="checkbox"
                            onChange={handleSelectChange}
                            value={selectedOptions.map(option => option.value)}
                        >
                            {predefinedOptions.map(option => (
                                <MenuItemOption key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItemOption>
                            ))}
                        </MenuOptionGroup>
                    </MenuList>
                </Menu>
            </HStack>
        </Box>
    );
};

export default MultiSelect;
