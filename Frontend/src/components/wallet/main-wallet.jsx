// import { Field, FieldGroup } from "@/components/ui/field";
// import {
//     Dialog,
//     DialogClose,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogMedia,
//     AlertDialogTitle,
//     AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Spinner } from "@/components/ui/spinner";
// import { Button } from "../ui/button";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import {
//     InputGroup,
//     InputGroupAddon,
//     InputGroupInput,
// } from "@/components/ui/input-group";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faMagnifyingGlass,
//     faPlus,
//     faPenToSquare,
//     faTrash,
// } from "@fortawesome/free-solid-svg-icons";
// import { Separator } from "@/components/ui/separator";
// import { useState } from "react";

// export default function MainWallet({
//     wallets,
//     isLoading,
//     handeleSubmit,
//     handleChange,
//     isEditing,
//     setIsEditing,
// }) {
//     const [openDelete, setOpenDelete] = useState(false);
//     const [id, setId] = useState(0);
//     const [open, setOpen] = useState(false);

//     const handleDelete = async (e) => {
//         console.log(id);
//     };

//     return (
//         <>
//             <Dialog open={open} onOpenChange={setOpen}>
//                 <DialogContent className="sm:max-w-sm">
//                     <form onSubmit={handeleSubmit}>
//                         <DialogHeader className="pb-6">
//                             <DialogTitle className="font-semibold text-lg">
//                                 {isEditing ? "Edit dompet" : "Tambah dompet"}
//                             </DialogTitle>
//                             <DialogDescription
//                                 aria-describedby={
//                                     undefined
//                                 }></DialogDescription>
//                         </DialogHeader>
//                         <FieldGroup className="pb-4">
//                             <Field>
//                                 <Label htmlFor="name">Nama dompet</Label>
//                                 <Input
//                                     id="name"
//                                     onChange={handleChange}
//                                     value={wallet.name}
//                                 />
//                             </Field>
//                             <Field>
//                                 <Label htmlFor="balance">Saldo</Label>
//                                 <Input
//                                     id="balance"
//                                     value={wallet.balance}
//                                     onChange={handleChange}
//                                     type="number"
//                                 />
//                             </Field>
//                         </FieldGroup>
//                         <DialogFooter>
//                             <DialogClose asChild>
//                                 <Button
//                                     onClick={() => setOpen(false)}
//                                     variant="outline">
//                                     Batal
//                                 </Button>
//                             </DialogClose>
//                             <Button type="submit" disabled={isWaiting}>
//                                 {isWaiting && <Spinner className="size-4" />}
//                                 Simpan
//                             </Button>
//                         </DialogFooter>
//                     </form>
//                 </DialogContent>
//             </Dialog>

//             <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
//                 <AlertDialogContent size="sm">
//                     <AlertDialogHeader>
//                         <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
//                             <FontAwesomeIcon icon={faTrash} />
//                         </AlertDialogMedia>
//                         <AlertDialogTitle>Hapus Dompet?</AlertDialogTitle>
//                         <AlertDialogDescription>
//                             Ini akan menghapus dompet ini secara permanen.
//                         </AlertDialogDescription>
//                     </AlertDialogHeader>
//                     <AlertDialogFooter>
//                         <AlertDialogCancel variant="outline">
//                             Batal
//                         </AlertDialogCancel>
//                         <AlertDialogAction
//                             variant="destructive"
//                             onClick={handleDelete}>
//                             Hapus
//                         </AlertDialogAction>
//                     </AlertDialogFooter>
//                 </AlertDialogContent>
//             </AlertDialog>

//             <div className="flex flex-col gap-4">
//                 <div className="w-full flex justify-between">
//                     <Field className="max-w-sm bg-white">
//                         <InputGroup>
//                             <InputGroupInput
//                                 id="inline-start-input"
//                                 placeholder="Search..."
//                             />
//                             <InputGroupAddon align="inline-start">
//                                 <FontAwesomeIcon icon={faMagnifyingGlass} />
//                             </InputGroupAddon>
//                         </InputGroup>
//                     </Field>
//                     <Button
//                         className="bg-brand-600 hover:bg-brand-700"
//                         onClick={() => setOpen(true)}>
//                         <FontAwesomeIcon icon={faPlus} /> Tambah
//                     </Button>
//                 </div>
//                 <Separator />
//                 {isLoading ? (
//                     <div className="w-full py-12 flex justify-center">
//                         <Spinner className="size-8" />
//                     </div>
//                 ) : (
//                     <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
//                         {wallets.map((wallet) => (
//                             <div className="" key={wallet.id}>
//                                 <Card
//                                     size="lg"
//                                     className="mx-auto w-full max-w-sm">
//                                     <CardHeader>
//                                         <CardTitle className="text-lg">
//                                             {wallet.name}
//                                         </CardTitle>
//                                     </CardHeader>
//                                     <CardContent>
//                                         <p className="text-3xl  font-bold">
//                                             {new Intl.NumberFormat("id-ID", {
//                                                 style: "currency",
//                                                 currency: "IDR",
//                                             }).format(wallet.balance)}
//                                         </p>
//                                     </CardContent>
//                                     <CardFooter>
//                                         <div className="w-full flex gap-2">
//                                             <Button
//                                                 size="sm"
//                                                 className="flex-1 bg-brand-600 hover:brand-700">
//                                                 Detail
//                                             </Button>
//                                             <div className="flex gap-2">
//                                                 <Button
//                                                     variant="outline"
//                                                     size="sm">
//                                                     <FontAwesomeIcon
//                                                         icon={faPenToSquare}
//                                                     />
//                                                 </Button>
//                                                 <Button
//                                                     onClick={() => {
//                                                         setOpenDelete(true);
//                                                         setId(wallet.id);
//                                                     }}
//                                                     size="sm"
//                                                     className="bg-red-600 hover:bg-red-700">
//                                                     <FontAwesomeIcon
//                                                         icon={faTrash}
//                                                     />
//                                                 </Button>
//                                             </div>
//                                         </div>
//                                     </CardFooter>
//                                 </Card>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// }
