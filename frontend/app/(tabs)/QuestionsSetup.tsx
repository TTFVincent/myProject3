import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import {
  NativeBaseProvider,
  Box,
  Text,
  Pressable,
  Heading,
  IconButton,
  Icon,
  HStack,
  Avatar,
  VStack,
  Spacer,
  Center,
  ScrollView,
  Modal,
  FormControl,
  Input,
  Button,
  TextArea,
  Divider,
} from "native-base";
import { RowMap, SwipeListView } from "react-native-swipe-list-view";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { useAuth } from "../../context/auth";
import { callAPI } from "../../api/api";

type UserQuestion = {
  question: { question: string };
  answer: string;
};

type ModalState = {
  show: boolean;
  item?: UserQuestion;
};

export default function QuestionsSetup() {
  const [mode, setMode] = useState("Basic");
  const [data, setData] = useState<UserQuestion[]>([]);
  const [modal, setModal] = useState<ModalState>({ show: false });
  const authContext = useAuth();
  useEffect(() => {
    if (authContext && authContext.user) {
      loadUserQuestion(authContext.user.id, setData);
    }
  }, [authContext]);
  return (
    <NativeBaseProvider>
      <Center w="100%" flex={1} justifyContent={"start"}>
        <Box
          _dark={{
            bg: "coolGray.800",
          }}
          _light={{
            bg: "white",
          }}
          flex="1"
          safeAreaTop
          minW="400px"
          w="100%"
        >
          <Basic data={data} setModal={setModal} />
          {/* <ScrollView showsVerticalScrollIndicator={false}>
            <Basic data={data} setModal={setModal} />
          </ScrollView> */}
        </Box>
        <Modal
          isOpen={modal.show}
          onClose={() => setModal({ ...modal, show: false })}
        >
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Modify Question</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>Question</FormControl.Label>
                <TextArea
                  value={modal.item?.question.question}
                  autoCompleteType={true}
                />
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label>Answer</FormControl.Label>
                <TextArea value={modal.item?.answer} autoCompleteType={true} />
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    () => setModal({ ...modal, show: false });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    () => setModal({ ...modal, show: false });
                  }}
                >
                  Save
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    </NativeBaseProvider>
  );
}

async function saveUserQuestion(
  userQuestionId: string,
  setModal: Dispatch<SetStateAction<ModalState>>
): Promise<void> {
  const result: UserQuestion[] = await callAPI({
    method: "GET",
    pathname: `/users-questions?user-id=${userId}`,
  });
  setData(result);
}

async function loadUserQuestion(
  userId: string,
  setData: Dispatch<SetStateAction<UserQuestion[]>>
): Promise<void> {
  const result: UserQuestion[] = await callAPI({
    method: "GET",
    pathname: `/users-questions?user-id=${userId}`,
  });
  setData(result);
}

// type GetCompanyQuestionOutput = {
//   error?: string;
//   items: Array<CompanyQuestion>;
// };

function Basic(props: {
  data: UserQuestion[];
  setModal: Dispatch<SetStateAction<ModalState>>;
}) {
  // const id = useRoute().params?.["id"];

  // const { render } = useGet<GetCompanyQuestionOutput>(
  //   `/company/${id}/questions`,
  //   {}
  // )
  // const data = [
  //   {
  //     key: null,
  //     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
  //     fullName: "Afreen Khan",
  //     timeStamp: "12:47 PM",
  //     recentText: "Good Day!",
  //     avatarUrl:
  //       "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  //   },
  //   {
  //     key: null,
  //     id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
  //     fullName: "Sujita Mathur",
  //     timeStamp: "11:11 PM",
  //     recentText: "Cheer up, there!",
  //     avatarUrl:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU",
  //   },
  //   {
  //     key: null,
  //     id: "58694a0f-3da1-471f-bd96-145571e29d72",
  //     fullName: "Anci Barroco",
  //     timeStamp: "6:22 PM",
  //     recentText: "Good Day!",
  //     avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg",
  //   },
  //   {
  //     key: null,
  //     id: "68694a0f-3da1-431f-bd56-142371e29d72",
  //     fullName: "Aniket Kumar",
  //     timeStamp: "8:56 PM",
  //     recentText: "All the best",
  //     avatarUrl:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU",
  //   },
  //   {
  //     key: null,
  //     id: "28694a0f-3da1-471f-bd96-142456e29d72",
  //     fullName: "Kiara",
  //     timeStamp: "12:47 PM",
  //     recentText: "I will call today.",
  //     avatarUrl:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
  //   },
  // ];
  const [listData, setListData] = useState(props.data);

  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap: any, rowKey: any) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = (rowKey: any) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = ({ item, index }: { item: UserQuestion; index: any }) => (
    <Box>
      <Pressable
        onPress={() => props.setModal({ show: true, item })}
        _dark={{
          bg: "coolGray.800",
        }}
        _light={{
          bg: "white",
        }}
      >
        <Box pl="6" pr="5" py="2">
          <HStack alignItems="center" space={3}>
            <VStack>
              <Text
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
                bold
              >
                {item.question.question}
              </Text>
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                {item.answer}
              </Text>
            </VStack>
            <Spacer />
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = (data: any, rowMap: any) => (
    <HStack flex="1" pl="2">
      <Pressable
        w="70"
        ml="auto"
        bg="coolGray.200"
        justifyContent="center"
        onPress={() => closeRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon
            as={<Entypo name="dots-three-horizontal" />}
            size="xs"
            color="coolGray.800"
          />
          <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
            More
          </Text>
        </VStack>
      </Pressable>
      <Pressable
        w="70"
        bg="red.500"
        justifyContent="center"
        onPress={() => deleteRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
          <Text color="white" fontSize="xs" fontWeight="medium">
            Delete
          </Text>
        </VStack>
      </Pressable>
    </HStack>
  );

  return (
    <Box bg="white" safeArea flex="1">
      {/* {render((json) => (
        <SwipeListView
          data={json.items}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-130}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onRowDidOpen={onRowDidOpen}
        />
      ))} */}
      <SwipeListView
        data={props.data}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        disableRightSwipe={true}
        rightOpenValue={-130}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
    </Box>
  );
}
