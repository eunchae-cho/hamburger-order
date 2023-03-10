import React, {useEffect, useReducer, useState} from "react";
import {Button, Modal, Image, Divider, Table, Checkbox, Segment} from "semantic-ui-react";
import WhiteFrame from '../../assets/images/white_frame.png'
import {ingredients} from "../../mock";
import {optionType} from "../../utils/typeHandler/optionType";
import {isEmpty, isNotEmpty} from "../../utils/ObjectUtils";

const BurgerOptionModal = ({ item }) => {
    const [open, setOpen] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [others, setOthers] = useState([]);
    const [addOptions, setAddOptions] = useState([]);
    const [exceptOptions, setExceptOptions] = useState([]);
    const [otherOptions, setOtherOptions] = useState([]);
    const [any, forceUpdate] = useReducer(num => num + 1, 0);

    useEffect(() => {
        if (open) {
            setIngredients(item.ingredient);
            setOthers(item.others);
        }
    }, [open])

    // 취소 버튼  클릭 시
    const handleCancel = () => {
        setOpen(false);
        setAddOptions([]);
    }

    // 담기 버튼 클릭 시
    const handleAdd = () => {
        setOpen(false);
        setAddOptions([]);
    }

    // 추가 옵션에서 플러스 버튼을 누를 때
    const handlePlusBtn = (ingredient) => {
        let option = addOptions.filter((i) => i.id === ingredient.id)[0];
        // 값이 존재할 때
        if (option !== undefined) {
            if (option.count >= 5) {
                alert('최대 5개까지 추가 가능합니다.');
                return;
            }

            option.count += 1;

            forceUpdate();

        } else {
            option = {
                id: ingredient.id,
                parentId: ingredient.parentId,
                name: ingredient.name,
                count: 1
            }
            setAddOptions([...addOptions, option]);
        }
    }

    // 추가 옵션에서 마이너스 버튼을 누를 때
     const handleMinusBtn = (ingredient) => {
        let option = addOptions.filter((i) => i.id === ingredient.id)[0];
        // 값이 존재할 때
        if (option !== undefined) {

            option.count -= 1;

            // 값이 0일 때 배열에서 빼기
            if (option.count <= 0) {
                setAddOptions(addOptions.filter((i) => i.id !== ingredient.id));
                return;
            }

            forceUpdate();

        }
     }

     // 제외 옵션 클릭 시
     const handleCheckExcept = (ingredient ) => {
         let option = exceptOptions.filter((i) => i.id === ingredient.id)[0];

         // 제외할 시
         if (option === undefined) {
             option = {
                 id: ingredient.id,
                 parentId: ingredient.parentId,
                 name: ingredient.name
             }

             setExceptOptions([...exceptOptions, option]);
         } else {
             setExceptOptions(exceptOptions.filter((i) => i.id !== ingredient.id));
         }
     }

     // 기타 옵션 클릭 시
    const handleCheckOther = (other) => {
       let option = otherOptions.filter((i) => i.id === other.id);

       if (option === undefined || option.length == 0) {
           option = {
               id: other.id,
               parentId: other.id,
               name: other.name
           }

           setOtherOptions([...otherOptions, option]);
       } else {
           setOtherOptions(otherOptions.filter((i) => i.id !== other.id));
       }
    }

    return (
        <Modal
            open={open}
            closeIcon='close'
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            trigger={<Button icon='plus cart' />}
        >
            <Modal.Header>
                <div id='menu-header-modal'>
                    {item.name}
                </div>
            </Modal.Header>
            <Modal.Content image scrolling>
                <Image size='medium' src={WhiteFrame} wrapped />

                <Modal.Description style={{ width: '100%' }}>
                    <p>
                        {item.description}
                    </p>

                    <Divider horizontal style={{ margin: '2rem 0'}}>
                            추가 옵션
                    </Divider>

                    <Table definition>
                        <Table.Body>
                            {
                                ingredients.map((ingredient) => (
                                    ingredient.addable &&
                                    <Table.Row>
                                        <Table.Cell width={4}>{ingredient.name}</Table.Cell>
                                        <Table.Cell textAlign='right'>
                                            <Button.Group size='mini'>
                                                <Button icon='plus' onClick={() => handlePlusBtn(ingredient)}/>
                                                <Button icon='minus' onClick={() => handleMinusBtn(ingredient)}/>
                                            </Button.Group>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            }
                        </Table.Body>
                    </Table>

                    <Divider horizontal style={{ margin: '2rem 0'}}>
                        제외 옵션
                    </Divider>

                    <Table definition>
                        <Table.Body>
                            {
                                ingredients.map((ingredient) => (
                                    ingredient.exceptable &&
                                    <Table.Row>
                                        <Table.Cell width={4} warning>{ingredient.name}</Table.Cell>
                                        <Table.Cell textAlign='right'>
                                            <Checkbox
                                                defaultChecked={false}
                                                onClick={() => handleCheckExcept(ingredient)}
                                            />
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            }
                        </Table.Body>
                    </Table>

                    <Divider horizontal style={{ margin: '2rem 0'}}>
                        기타 옵션
                    </Divider>

                    <Table definition>
                        <Table.Body>
                            {
                              others.map((other) => (
                                  <Table.Row>
                                      <Table.Cell width={4}>{other.name}</Table.Cell>
                                      <Table.Cell textAlign='right'>
                                          <Checkbox
                                              defaultChecked={false}
                                              onClick={() => handleCheckOther(other)}
                                          />
                                      </Table.Cell>
                                  </Table.Row>
                              ))
                            }
                        </Table.Body>
                    </Table>

                    {/* 옵션 내역 */}
                    <Segment style={{ marginBlock: '30px'}}>
                        {
                            addOptions.map((item) => (
                                <div style={{ fontSize: 'small' }}>
                                    {item.name} {item.count} 추가
                                </div>
                            ))
                        }
                        {
                            exceptOptions.map((item) => (
                                <div style={{ fontSize: 'small' }}>
                                    {item.name} 제외
                                </div>
                            ))
                        }
                        {
                            otherOptions.map((item) => (
                                <div style={{ fontSize: 'small' }}>
                                    {item.name}
                                </div>
                            ))
                        }
                    </Segment>

                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='grey' onClick={handleCancel}>
                    취소
                </Button>
                <Button onClick={handleAdd} primary>
                    담기
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default BurgerOptionModal