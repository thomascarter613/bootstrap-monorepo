use std::os::raw::c_char;

#[repr(C)]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum AionxStatus {
    Ok = 0,
    InvalidArgument = 1,
    PolicyDenied = 2,
    IoError = 3,
    InternalError = 255,
}

#[no_mangle]
pub extern "C" fn aionx_core_runtime_version() -> *const c_char {
    static VERSION: &[u8] = b"0.1.0\0";
    VERSION.as_ptr().cast()
}
