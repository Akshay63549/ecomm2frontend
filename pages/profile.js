import React, { useState } from "react";
import Wrapper from "@/components/Wrapper";
import AuthSelector from "@/components/profile/AuthSelector";
import SignUp from "@/components/profile/SignUp";
import { logOut } from "@/utils/auth";
import { getUser } from "@/store/contexts/userContext";
import AddressForm from "@/components/profile/AddressForm";
import { fetchDataFromApi } from "@/utils/api";
import OrderItem from "@/components/orders/OrderItem";
import Modal from "@/components/Modal";
import EmptyOrders from "@/components/orders/EmptyOrders";

function ProfilePage(props) {
  const { userData, ordersData } = props;
  const [choice, setChoice] = useState("login");
  const orders = ordersData?.data;
  const hasOrders = orders?.length > 0;
  const [openModal, setOpenModal] = useState(false);
  const handleChoice = () => setChoice("signup");

  if (userData.jwt)
    return (
      <div className="min-h-[650px] mt-8 flex mb-10 md:mb-0">
        {openModal && (
          <Modal logOut={logOut} close={() => setOpenModal(false)} />
        )}
        <Wrapper>
          <div className="grid grid-cols-1 gap-10 md:gap-0 md:grid-cols-2 md:py-4 h-full">
            <div className="flex flex-col gap-10 md:border-r-[1px] md:mr-4">
              <div className="md:mr-4">
                <AddressForm />
              </div>
              <button
                onClick={() => {
                  setOpenModal(true);
                }}
                className={`hover:opacity-80 transition-opacity ease-in-out md:mr-auto md:ml-0 min-h-[50px] border-dashed border-[2px] bg-[#151718] rounded-[4px] md:max-w-[250px] w-full text-offWhite`}
                type="button"
              >
                Излез
              </button>
            </div>
            <div>
              <h1 className="font-semibold mb-4 text-center">Моите поръчки</h1>

              {hasOrders && (
                <div className="flex flex-col gap-2 overflow-y-scroll max-h-[800px]">
                  {orders.map((order, index) => (
                    <OrderItem key={index} {...order.attributes} />
                  ))}
                </div>
              )}

              {!hasOrders && <EmptyOrders />}
            </div>
          </div>
        </Wrapper>
      </div>
    );

  return (
    <div className="min-h-[650px] mt-8 flex">
      <Wrapper>
        {choice === "login" && (
          <AuthSelector choice={choice} setChoice={handleChoice} />
        )}
        {choice === "signup" && <SignUp />}
      </Wrapper>
    </div>
  );
}

export default ProfilePage;

export async function getServerSideProps(ctx) {
  let userData = getUser(ctx);
  const { username } = userData;

  let ordersData = await fetchDataFromApi(
    `/api/orders?filters[user][$eq]=${username}`
  );

  if (ordersData.data.length < 1) ordersData = null;

  return {
    props: {
      userData,
      ordersData,
    },
  };
}
